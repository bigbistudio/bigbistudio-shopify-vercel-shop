import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export type Collection = {
  title: string;
  handle: string;
  image: string;
  alt: string;
};

type CollectionCardProps = {
  collection: Collection;
};

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${collection.handle}`}
      className="group/card block transition-[filter] duration-150 active:brightness-90"
    >
      <div className="relative aspect-square overflow-hidden rounded-sm border border-white/25 bg-muted">
        <Image
          src={collection.image}
          alt={collection.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 75vw"
          className="object-cover transition-transform duration-600 group-hover/card:scale-[1.02]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-4">
          <span
            className={cn(
              buttonVariants({
                variant: "link",
                size: "inline-link",
              }),
              "text-white",
            )}
          >
            {collection.title}
          </span>
        </div>
      </div>
    </Link>
  );
}
