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
      <Container className="max-w-6xl">
        <Sections className="gap-10 md:gap-20">
          <header className="mx-auto grid w-full max-w-3xl justify-items-center gap-4 text-center">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                <li>
                  <Link className="hover:text-foreground" href="/blog">
                    Journal
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{post.title}</li>
              </ol>
            </nav>

            <h1 className="text-3xl tracking-tight sm:text-4xl md:text-5xl">{post.title}</h1>

            {post.excerpt && (
              <p className="text-base leading-7 text-muted-foreground sm:text-lg">{post.excerpt}</p>
            )}

            {(post.author || publishedAt) && (
              <div className="flex flex-wrap justify-center gap-x-2 text-sm text-muted-foreground">
                {post.author && <span>{post.author}</span>}

                {post.author && publishedAt && <span aria-hidden="true">·</span>}

                {publishedAt && <time dateTime={post.publishedAt ?? undefined}>{publishedAt}</time>}
              </div>
            )}
          </header>

          {post.mainImage && (
            <EditorialImage
              alt={post.mainImage.alt || post.title}
              className="mx-auto max-w-6xl"
              image={post.mainImage}
              preload
            />
          )}

          <ArticleContent articleContent={post.articleContent} legacyBody={post.body} />
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
