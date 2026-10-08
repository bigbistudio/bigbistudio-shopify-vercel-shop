import Image from "next/image";
import Link from "next/link";

import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { shopConfig } from "@/lib/config";
import { urlFor } from "@/sanity/lib/image";
import type { BlogPostSummary } from "@/sanity/lib/queries";

export interface BlogCardProps {
  headingLevel?: 2 | 3;
  post: BlogPostSummary;
}

export function BlogCard({ headingLevel = 2, post }: BlogCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(800).fit("crop").url()
    : null;
  const publishedAt = post.publishedAt
    ? new Intl.DateTimeFormat(shopConfig.localization.locale, { dateStyle: "long" }).format(
        new Date(post.publishedAt),
      )
    : null;

  return (
    <article>
      <Link
        className="group grid content-start gap-4 focus-visible:outline-2"
        href={`/blog/${post.slug}`}
      >
        <div className="relative aspect-3/2 overflow-hidden">
          {imageUrl ? (
            <Image
              alt={post.mainImage?.alt || post.title}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
              src={imageUrl}
            />
          ) : (
            <ImagePlaceholder aria-hidden="true" className="size-full rounded-none bg-muted" />
          )}
        </div>
        <div className="grid gap-2.5">
          {publishedAt && (
            <time
              className="text-sm text-muted-foreground"
              dateTime={post.publishedAt ?? undefined}
            >
              {publishedAt}
            </time>
          )}
          <Heading className="text-xl font-medium tracking-tight group-hover:underline">
            {post.title}
          </Heading>
          {post.excerpt && (
            <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
          )}
        </div>
      </Link>
    </article>
  );
}
