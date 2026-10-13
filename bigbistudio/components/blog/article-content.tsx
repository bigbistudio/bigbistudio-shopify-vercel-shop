import { cn } from "cn";
import { PortableText, type PortableTextComponents } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

import { Prose } from "@/components/ui/prose";
import { getSafeEditorialUrl } from "@/sanity/lib/editorial-url";
import { urlFor } from "@/sanity/lib/image";
import type {
  ArticleContentBlock,
  BlogImage,
  CollectionCtaBlock,
  EditorialImageBlock,
  ImageTextSplitBlock,
  RichTextSection,
} from "@/sanity/lib/queries";

const PORTABLE_TEXT_COMPONENTS = {
  marks: {
    link: ({ children, value }) => {
      const href =
        value && typeof value === "object" && "href" in value && typeof value.href === "string"
          ? getSafeEditorialUrl(value.href)
          : null;

      return href ? (
        <Link className="underline underline-offset-4" href={href}>
          {children}
        </Link>
      ) : (
        <>{children}</>
      );
    },
  },
} satisfies PortableTextComponents;

export interface ArticleContentProps {
  articleContent: ArticleContentBlock[] | null;
}

export interface EditorialImageProps {
  alt: string;
  caption?: string | null;
  className?: string;
  credit?: string | null;
  image: BlogImage | null;
  preload?: boolean;
  sizes?: string;
}

export interface RichTextSectionContentProps {
  block: RichTextSection;
}

export interface EditorialImageContentProps {
  block: EditorialImageBlock;
}

export interface ImageTextSplitContentProps {
  block: ImageTextSplitBlock;
}

export interface CollectionCtaContentProps {
  block: CollectionCtaBlock;
}

function isRenderableImage(
  image: BlogImage | null | undefined,
): image is BlogImage & { assetHeight: number; assetWidth: number } {
  return (
    image !== null &&
    image !== undefined &&
    typeof image.assetWidth === "number" &&
    image.assetWidth > 0 &&
    typeof image.assetHeight === "number" &&
    image.assetHeight > 0
  );
}

function PortableTextBody({ value }: { value: RichTextSection["body"] }) {
  if (!value?.length) return null;

  return (
    <Prose className="max-w-none text-base leading-6 prose-p:leading-6 prose-a:text-foreground">
      <PortableText components={PORTABLE_TEXT_COMPONENTS} value={value} />
    </Prose>
  );
}

export function EditorialImage({
  alt,
  caption,
  className,
  credit,
  image,
  preload = false,
  sizes = "(max-width: 1200px) 100vw, 1152px",
}: EditorialImageProps) {
  if (!isRenderableImage(image)) return null;

  const sourceWidth = Math.min(image.assetWidth, 2400);

  return (
    <figure className={cn("grid w-full gap-2", className)}>
      <Image
        alt={alt}
        blurDataURL={image.assetLqip ?? undefined}
        className="h-auto w-full rounded-lg"
        height={image.assetHeight}
        placeholder={image.assetLqip ? "blur" : "empty"}
        preload={preload}
        sizes={sizes}
        src={urlFor(image).width(sourceWidth).url()}
        width={image.assetWidth}
      />
      {(caption || credit) && (
        <figcaption className="flex flex-wrap justify-center w-full gap-x-2 text-[13px] leading-6 text-muted-foreground">
          {caption && <span>{caption}</span>}
          {credit && <span className="italic">{credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}

export function RichTextSectionContent({ block }: RichTextSectionContentProps) {
  return (
    <section className="grid w-full gap-4 lg:gap-8">
      {block.heading && (
        <h2 className="text-xl font-medium tracking-tighter lg:text-3xl">{block.heading}</h2>
      )}
      <PortableTextBody value={block.body} />
    </section>
  );
}

export function EditorialImageContent({ block }: EditorialImageContentProps) {
  return (
    <EditorialImage
      alt={block.alt ?? ""}
      caption={block.caption}
      className="mx-auto max-w-6xl"
      credit={block.credit}
      image={block.image}
    />
  );
}

export function ImageTextSplitContent({ block }: ImageTextSplitContentProps) {
  const imageOnRight = block.imagePosition === "right";
  const hasImage = isRenderableImage(block.image);

  return (
    <section
      className={cn(
        "mx-auto grid w-full items-center gap-10 lg:gap-14",
        hasImage && "lg:grid-cols-2",
      )}
    >
      {hasImage && (
        <EditorialImage
          alt={block.alt ?? ""}
          caption={block.caption}
          className={imageOnRight ? "lg:order-2" : "lg:order-1"}
          image={block.image}
          sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 576px"
        />
      )}
      <div className={cn("grid gap-4 lg:gap-8", imageOnRight ? "lg:order-1" : "lg:order-2")}>
        {block.heading && (
          <h2 className="text-xl font-medium tracking-tighter lg:text-3xl">{block.heading}</h2>
        )}
        <PortableTextBody value={block.body} />
      </div>
    </section>
  );
}

export function CollectionCtaContent({ block }: CollectionCtaContentProps) {
  const href = getSafeEditorialUrl(block.destination);

  return (
    <aside className="mx-auto grid w-full max-w-4xl justify-items-center gap-4 border-y py-8 text-center lg:py-16">
      {block.heading && (
        <h2 className="text-xl font-medium tracking-tight sm:text-3xl">{block.heading}</h2>
      )}
      {block.description && (
        <p className="max-w-2xl text-base leading-6 text-muted-foreground">{block.description}</p>
      )}
      {href && block.buttonLabel && (
        <Link
          className="inline-flex min-h-11 cursor-pointer items-center justify-center border px-6 py-3 text-sm underline-offset-4 hover:bg-muted focus-visible:outline-2"
          href={href}
        >
          {block.buttonLabel}
        </Link>
      )}
    </aside>
  );
}

function ArticleContentBlockView({ block }: { block: ArticleContentBlock }) {
  switch (block["_type"]) {
    case "collectionCta":
      return <CollectionCtaContent block={block} />;
    case "editorialImage":
      return <EditorialImageContent block={block} />;
    case "imageTextSplit":
      return <ImageTextSplitContent block={block} />;
    case "richTextSection":
      return <RichTextSectionContent block={block} />;
    default:
      return null;
  }
}

export function ArticleContent({ articleContent }: ArticleContentProps) {
  return articleContent?.length ? (
    <div className="grid gap-10 lg:gap-14">
      {articleContent.map((block) => (
        <ArticleContentBlockView block={block} key={block["_key"]} />
      ))}
    </div>
  ) : null;
}
