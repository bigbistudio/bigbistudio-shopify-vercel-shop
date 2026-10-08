import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { Page } from "@/components/ui/page";
import { Prose } from "@/components/ui/prose";
import { Sections } from "@/components/ui/sections";
import { shopConfig } from "@/lib/config";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { getPost } from "@/sanity/lib/server";

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const title = post.title;
  const description = post.excerpt ?? undefined;
  const image = post.mainImage
    ? {
        alt: post.mainImage.alt || post.title,
        height: 630,
        url: urlFor(post.mainImage).width(1200).height(630).fit("crop").url(),
        width: 1200,
      }
    : undefined;

  return {
    alternates: buildAlternates({ pathname: `/blog/${post.slug}` }),
    description,
    openGraph: buildOpenGraph({
      description,
      images: image ? [image] : undefined,
      title,
      type: "article",
      url: `/blog/${post.slug}`,
    }),
    title,
    twitter: {
      card: "summary_large_image",
      description,
      images: image ? [image] : ["/og-default.png"],
      title,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const publishedAt = post.publishedAt
    ? new Intl.DateTimeFormat(shopConfig.localization.locale, { dateStyle: "long" }).format(
        new Date(post.publishedAt),
      )
    : null;

  return (
    <Page>
      <Container className="max-w-4xl">
        <Sections className="gap-10 md:gap-16">
          <Prose className="mx-auto grid w-full max-w-4xl gap-10 md:gap-16">
            <header className="not-prose mx-auto grid w-full max-w-3xl gap-4 text-center">
              <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">
                Bigbi Studio Journal
              </p>
              <h1 className="text-3xl tracking-tight sm:text-4xl md:text-5xl">{post.title}</h1>
              {post.excerpt && (
                <p className="text-base leading-7 text-muted-foreground sm:text-lg">
                  {post.excerpt}
                </p>
              )}
              {publishedAt && (
                <time
                  className="text-sm text-muted-foreground"
                  dateTime={post.publishedAt ?? undefined}
                >
                  {publishedAt}
                </time>
              )}
            </header>
            {post.mainImage && (
              <div className="not-prose relative aspect-3/2 overflow-hidden">
                <Image
                  alt={post.mainImage.alt || post.title}
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 896px) 100vw, 896px"
                  src={urlFor(post.mainImage).width(1800).height(1200).fit("crop").url()}
                />
              </div>
            )}
            <div className="mx-auto w-full max-w-2xl">
              <PortableText value={post.body} />
            </div>
          </Prose>
        </Sections>
      </Container>
    </Page>
  );
}
