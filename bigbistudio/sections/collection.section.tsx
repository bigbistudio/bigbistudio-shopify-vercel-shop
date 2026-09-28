import { cn } from "cn";

import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { CollectionCarousel } from "@/bigbistudio/components/collections/collection-carousel";

const collections = [
  {
    title: "Cardigans",
    handle: "cardigans",
    image: "/images/collections/cardigans-collection-card.jpg",
    alt: "Cardigans collection",
  },
  {
    title: "Sweaters",
    handle: "sweaters",
    image: "/images/collections/sweaters-collection-card.jpg",
    alt: "Sweater collection",
  },
  {
    title: "Jackets & Coats",
    handle: "jackets-coats",
    image: "/images/collections/jackets-coats-collection-card.jpg",
    alt: "Jackets & Coats collection",
  },
  {
    title: "Vests",
    handle: "vests",
    image: "/images/collections/vests-coats-collection-card.jpg",
    alt: "Vests collection",
  },
  {
    title: "Midi Skirts",
    handle: "midi-skirts",
    image: "/images/collections/midi-skirts-collection-card.jpg",
    alt: "Midi Skirts collection",
  },
  {
    title: "Pointelle",
    handle: "pointelle",
    image: "/images/collections/pointelle-collection-card.jpg",
    alt: "Pointelle collection",
  },
  {
    title: "Pants & Shorts",
    handle: "pants-shorts",
    image: "/images/collections/pants-shorts-collection-card.jpg",
    alt: "Pants & Shorts collection",
  },
  {
    title: "Dresses",
    handle: "dresses",
    image: "/images/collections/dresses-collection-card.jpg",
    alt: "Dresses collection",
  },
];

export function CollectionSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <div className="mb-6 flex items-center justify-between md:mb-8">
          <h2 className="text-xl font-medium tracking-tighter md:text-2xl">Shop Collections</h2>

          <a
            href="/collections"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2 px-2 text-[13px]")}
          >
            View all
            <span className="relative h-px w-3 bg-current">
              <span className="absolute right-0 top-1/2 size-1.5 -translate-y-1/2 rotate-45 border-r border-t border-current" />
            </span>
          </a>
        </div>

        <CollectionCarousel collections={collections} />
      </Container>
    </section>
  );
}
