import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ArticleContent, EditorialImage } from "@/bigbistudio/components/blog/article-content";
import { Container } from "@/components/ui/container";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import { shopConfig } from "@/lib/config";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { getPost } from "@/sanity/lib/server";

type BlogPostContentProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const title = post.seoTitle?.trim() || post.title;
  const description = post.seoDescription?.trim() || post.excerpt || undefined;

  const image = post.mainImage
    ? {
        alt: post.mainImage.alt || post.title,
        height: 630,
        url: urlFor(post.mainImage).width(1200).height(630).fit("crop").url(),
        width: 1200,
      }
    : undefined;

  return {
    alternates: buildAlternates({
      pathname: `/blog/${post.slug}`,
    }),
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

export default function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPostContent params={params} />
    </Suspense>
  );
}

async function BlogPostContent({ params }: BlogPostContentProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const publishedAt = post.publishedAt
    ? new Intl.DateTimeFormat(shopConfig.localization.locale, {
        dateStyle: "long",
      }).format(new Date(post.publishedAt))
    : null;

  return (
    <Page>
      <Container className="max-w-4xl pb-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-2 text-sm text-muted-foreground pb-6">
            <li>
              <Link className="hover:text-foreground" href="/blog">
                Journal
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{post.title}</li>
          </ol>
        </nav>
        <Sections className="gap-10 md:gap-20">
          <div className="relative flex flex-col gap-6">
            <header className="lg:absolute lg:bottom-6 lg:left-6 lg:right-6 z-10 flex h-fit flex-col gap-4 lg:rounded-xl lg:border lg:border-white/30 bg-white/60 lg:p-6 text-left lg:shadow-sm backdrop-blur-md">
              <h1 className="text-2xl lg:text-3xl tracking-tight">{post.title}</h1>

              {post.excerpt && (
                <p className="text-base leading-6 text-muted-foreground">{post.excerpt}</p>
              )}

              {(post.author || publishedAt) && (
                <div className="flex flex-wrap gap-x-2 text-sm text-muted-foreground">
                  {post.author && <span>{post.author}</span>}

                  {post.author && publishedAt && <span aria-hidden="true">·</span>}

                  {publishedAt && (
                    <time dateTime={post.publishedAt ?? undefined}>{publishedAt}</time>
                  )}
                </div>
              )}
            </header>
            {post.mainImage && (
              <EditorialImage
                alt={post.mainImage.alt || post.title}
                className="relative mx-auto aspect-video w-full overflow-hidden rounded-lg border border-border/10"
                image={post.mainImage}
                preload
              />
            )}
          </div>
          <ArticleContent articleContent={post.articleContent} />
        </Sections>
      </Container>
    </Page>
  );
}

function BlogPostSkeleton() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12" aria-busy="true" aria-label="Loading article">
      <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />

      <div className="mt-6 h-4 w-1/3 animate-pulse rounded bg-muted" />

      <div className="mt-10 space-y-3">
        <div className="h-4 animate-pulse rounded bg-muted" />
        <div className="h-4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
      </div>
    </main>
  );
}
