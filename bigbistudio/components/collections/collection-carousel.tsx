"use client";

import { useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import { CollectionCard, type Collection } from "./collection-card";

type CollectionCarouselProps = {
  collections: Collection[];
};

export function CollectionCarousel({ collections }: CollectionCarouselProps) {
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 6000,
        stopOnInteraction: false,
      }),
    [],
  );

  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[autoplay]}
    >
      <CarouselContent className="-ml-2 md:-ml-2">
        {collections.map((collection) => (
          <CarouselItem
            key={collection.handle}
            className="basis-[72%] pl-2 sm:basis-[45%] md:basis-1/3 md:pl-2 lg:basis-1/4"
          >
            <CollectionCard collection={collection} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
