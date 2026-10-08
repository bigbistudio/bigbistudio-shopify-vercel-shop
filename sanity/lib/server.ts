import { cacheLife, cacheTag } from "next/cache";

import { client } from "@/sanity/lib/client";
import { postQuery, postsQuery, type BlogPost, type BlogPostSummary } from "@/sanity/lib/queries";

export async function getPosts(): Promise<BlogPostSummary[]> {
  "use cache";
  cacheLife("days");
  cacheTag("sanity-posts");

  return client.fetch<BlogPostSummary[]>(postsQuery);
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  "use cache";
  cacheLife("days");
  cacheTag("sanity-posts", `sanity-post-${slug}`);

  return client.fetch<BlogPost | null>(postQuery, { slug });
}
