import { createHmac, timingSafeEqual } from "node:crypto";

import { revalidateTag } from "next/cache";

import { dataset, projectId } from "@/sanity/env";

const SANITY_POST_WEBHOOK_SECRET = process.env.SANITY_POST_WEBHOOK_SECRET;
const SANITY_WEBHOOK_SIGNATURE_HEADER = "sanity-webhook-signature";

interface SanityPostWebhookPayload {
  _id: string;
  _type: "post";
  afterSlug?: string | null;
  beforeSlug?: string | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasControlCharacters(value: string): boolean {
  return [...value].some((character) => {
    const code = character.charCodeAt(0);
    return code <= 0x1f || code === 0x7f;
  });
}

function isSanityPostWebhookPayload(value: unknown): value is SanityPostWebhookPayload {
  if (!isRecord(value) || value["_type"] !== "post") return false;

  if (
    typeof value["_id"] !== "string" ||
    value["_id"].length === 0 ||
    value["_id"].length > 200 ||
    hasControlCharacters(value["_id"])
  ) {
    return false;
  }

  return [value.beforeSlug, value.afterSlug].every(
    (slug) =>
      slug === undefined ||
      slug === null ||
      (typeof slug === "string" &&
        slug.length > 0 &&
        slug.length <= 244 &&
        !hasControlCharacters(slug)),
  );
}

function verifySanitySignature(body: string, signature: string, secret: string): boolean {
  const match = /^t=(\d+),v1=([A-Za-z0-9_-]+)$/.exec(signature);

  if (!match) return false;

  const expected = createHmac("sha256", secret).update(`${match[1]}.${body}`, "utf8").digest();
  const received = Buffer.from(match[2], "base64url");

  return expected.length === received.length && timingSafeEqual(expected, received);
}

export async function POST(request: Request) {
  if (!SANITY_POST_WEBHOOK_SECRET) {
    return Response.json({ error: "Webhook is not configured" }, { status: 503 });
  }

  const body = await request.text();
  const signature = request.headers.get(SANITY_WEBHOOK_SIGNATURE_HEADER);

  if (!signature || !verifySanitySignature(body, signature, SANITY_POST_WEBHOOK_SECRET)) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  if (
    request.headers.get("sanity-project-id") !== projectId ||
    request.headers.get("sanity-dataset") !== dataset
  ) {
    return Response.json({ error: "Webhook project or dataset mismatch" }, { status: 403 });
  }

  let payload: unknown;

  try {
    payload = JSON.parse(body);
  } catch {
    return Response.json({ error: "Malformed JSON payload" }, { status: 400 });
  }

  if (!isRecord(payload)) {
    return Response.json({ error: "Malformed webhook payload" }, { status: 400 });
  }

  if (payload["_type"] !== "post") {
    return Response.json({ error: "Unsupported document type" }, { status: 422 });
  }

  if (!isSanityPostWebhookPayload(payload)) {
    return Response.json({ error: "Malformed post payload" }, { status: 400 });
  }

  const tags = new Set([
    "sanity-posts",
    `sanity-post-id-${payload["_id"]}`,
    ...(payload.beforeSlug ? [`sanity-post-${payload.beforeSlug}`] : []),
    ...(payload.afterSlug ? [`sanity-post-${payload.afterSlug}`] : []),
  ]);

  for (const tag of tags) {
    revalidateTag(tag, { expire: 0 });
  }

  return Response.json({
    success: true,
    invalidated: {
      listing: true,
      post: true,
      slugs: tags.size - 2,
    },
  });
}
