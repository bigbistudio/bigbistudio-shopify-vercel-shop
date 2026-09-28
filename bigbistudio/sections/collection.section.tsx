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

  const handleViewAllClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Desktop: navigate immediately.
    if (window.matchMedia("(min-width: 768px)").matches) {
      return;
    }

    // Mobile/tablet: first click only reveals the label.
    if (!showViewAll) {
      event.preventDefault();
      setShowViewAll(true);
    }
  };

  return (
    <Container className="py-12 md:py-16 lg:py-20">
      <div className="mb-6 flex items-center justify-between md:mb-8">
        <h2 className="text-xl font-medium tracking-tighter md:text-2xl">Shop Collections</h2>

        <a
          href="/collections"
          aria-label="View all collections"
          onClick={handleViewAllClick}
          className="group/view-all inline-flex items-center text-muted-foreground transition-colors hover:text-foreground"
        >
          <span
            className={`overflow-hidden whitespace-nowrap text-[13px] md:text-sm underline md:no-underline transition-all duration-300 ease-out ${
              showViewAll
                ? "mr-2 max-w-20 opacity-100"
                : "max-w-0 opacity-0 md:mr-2 md:max-w-20 md:opacity-100"
            }`}
          >
            View all
          </span>

          <span className="flex size-3.5 shrink-0 items-center justify-center rounded-full border border-current md:size-4.5">
            <Plus className="size-2.5" />
          </span>
        </a>
      </div>

      <div className="relative">
        <CollectionCarousel collections={collections} />
      </div>
    </Container>
  );
}
