"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Container } from "@/components/ui/container";
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
  const [showViewAll, setShowViewAll] = useState(false);

  return (
    <Container className="py-12 md:py-16 lg:py-20">
      <div className="mb-6 flex items-center justify-between md:mb-8">
        <h2 className="text-xl font-medium tracking-tighter md:text-2xl">Shop Collections</h2>

        <div className="inline-flex items-center text-muted-foreground">
          <a
            href="/collections"
            className={`overflow-hidden whitespace-nowrap text-[13px] underline decoration-1 underline-offset-2 transition-all duration-300 ease-out md:text-sm ${
              showViewAll ? "mr-2 max-w-20 opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            View all
          </a>

          <button
            type="button"
            aria-label={showViewAll ? "Hide View all" : "Show View all"}
            onClick={() => setShowViewAll((value) => !value)}
            className="flex size-3.5 shrink-0 items-center justify-center rounded-full border border-current md:size-4.5"
          >
            <Plus
              className={`size-2.5 transition-transform duration-300 ${
                showViewAll ? "rotate-45" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="relative">
        <CollectionCarousel collections={collections} />
      </div>
    </Container>
  );
}
