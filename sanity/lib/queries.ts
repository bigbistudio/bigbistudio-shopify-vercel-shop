import type { SanityImageSource } from "@sanity/image-url";
import { defineQuery } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";

export interface BlogPostSummary {
  _id: string;
  excerpt: string | null;
  mainImage: (SanityImageSource & { alt?: string | null }) | null;
  publishedAt: string | null;
  slug: string;
  title: string;
}

export interface BlogPost extends BlogPostSummary {
  body: PortableTextBlock[] | null;
}

export const postsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage {
      ...,
      alt
    },
    publishedAt
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage {
      ...,
      alt
    },
    publishedAt,
    body
  }
`);
