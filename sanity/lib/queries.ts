import type { SanityImageSource } from "@sanity/image-url";
import { defineQuery } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";

export type BlogImage = SanityImageSource & {
  alt?: string | null;
  assetHeight?: number | null;
  assetLqip?: string | null;
  assetWidth?: number | null;
};

export interface BlogPostSummary {
  _id: string;
  excerpt: string | null;
  mainImage: BlogImage | null;
  publishedAt: string | null;
  slug: string;
  title: string;
}

interface ArticleContentBlockBase {
  _key: string;
}

export interface RichTextSection extends ArticleContentBlockBase {
  _type: "richTextSection";
  body: PortableTextBlock[] | null;
  heading?: string | null;
}

export interface EditorialImageBlock extends ArticleContentBlockBase {
  _type: "editorialImage";
  alt?: string | null;
  caption?: string | null;
  credit?: string | null;
  image: BlogImage | null;
}

export interface ImageTextSplitBlock extends ArticleContentBlockBase {
  _type: "imageTextSplit";
  alt?: string | null;
  body: PortableTextBlock[] | null;
  caption?: string | null;
  heading?: string | null;
  image: BlogImage | null;
  imagePosition?: "left" | "right" | null;
}

export interface CollectionCtaBlock extends ArticleContentBlockBase {
  _type: "collectionCta";
  buttonLabel?: string | null;
  description?: string | null;
  destination?: string | null;
  heading?: string | null;
}

export type ArticleContentBlock =
  | CollectionCtaBlock
  | EditorialImageBlock
  | ImageTextSplitBlock
  | RichTextSection;

export interface BlogPost extends BlogPostSummary {
  articleContent: ArticleContentBlock[] | null;
  author: string | null;
  body: PortableTextBlock[] | null;
  seoDescription: string | null;
  seoTitle: string | null;
}

const imageProjection = `
  ...,
  alt,
  "assetWidth": asset->metadata.dimensions.width,
  "assetHeight": asset->metadata.dimensions.height,
  "assetLqip": asset->metadata.lqip
`;

export const postsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage {${imageProjection}},
    publishedAt
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage {${imageProjection}},
    publishedAt,
    author,
    body,
    seoTitle,
    seoDescription,
    articleContent[]{
      _key,
      _type,
      heading,
      body,
      image {${imageProjection}},
      alt,
      caption,
      credit,
      imagePosition,
      description,
      buttonLabel,
      destination
    }
  }
`);
