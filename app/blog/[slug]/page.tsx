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
      <Container className="max-w-4xl lg:py-8">
        <Sections className="gap-8 lg:gap-12">
          <div className="flex flex-col gap-4 border-b border-border/40 pb-4 lg:pb-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap gap-2 text-sm text-muted-foreground pb-2 lg:pb-6">
                <li>
                  <Link className="hover:text-foreground" href="/blog">
                    Journal
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{post.title}</li>
              </ol>
            </nav>
            <h1 className="text-2xl lg:text-4xl font-normal">{post.title}</h1>

            {post.excerpt && (
              <p className="text-base leading-6 text-muted-foreground">{post.excerpt}</p>
            )}
          </div>
          <ArticleContent articleContent={post.articleContent} />
          <div className="border-t border-border/40 pt-4 pb-20">
            {(post.author || publishedAt) && (
              <div className="flex flex-wrap gap-x-2 text-[13px] text-muted-foreground">
                {post.author && <span>{post.author}</span>}

                {post.author && publishedAt && <span aria-hidden="true">·</span>}

                {publishedAt && <time dateTime={post.publishedAt ?? undefined}>{publishedAt}</time>}
              </div>
            )}
          </div>
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
