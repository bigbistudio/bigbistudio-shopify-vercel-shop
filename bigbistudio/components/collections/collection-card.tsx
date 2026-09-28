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
    <Link href={`/collections/${collection.handle}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-sm border border-white/25 bg-muted">
        <Image
          src={collection.image}
          alt={collection.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 75vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <span
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "pointer-events-none border-white/40 bg-black/10 text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-black/30 group-hover:text-white",
            )}
          >
            {collection.title}
          </span>
        </div>
      </div>
    </Link>
  );
}