"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

import { CollectionCard, type Collection } from "./collection-card";

type CollectionCarouselProps = {
  collections: Collection[];
};

type CarouselUIProps = {
  count: number;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
};

export function CollectionCarousel({ collections }: CollectionCarouselProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="group/carousel relative">
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
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

        {mounted && (
          <CarouselUI
            count={collections.length}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        )}
      </Carousel>
    </div>
  );
}

function CarouselUI({ count, selectedIndex, setSelectedIndex }: CarouselUIProps) {
  const { api } = useCarousel();

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, setSelectedIndex]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <>
      {/* Desktop arrows */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden -translate-y-[calc(50%+18px)] items-center justify-between px-4 opacity-0 transition-opacity duration-300 group-hover/carousel:pointer-events-auto group-hover/carousel:opacity-100 md:flex">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-10 rounded-full border-white/50 text-white transition-all hover:bg-muted/40 focus-within:scale-110"
          onClick={scrollPrev}
          aria-label="Previous collection"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-10 rounded-full border-white/50 text-white transition-all hover:bg-muted/40 focus-within:scale-110"
          onClick={scrollNext}
          aria-label="Next collection"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      {/* Collection progress */}
      <div className="relative mx-auto mt-4 h-0.5 w-[40%] overflow-hidden rounded-full bg-muted-foreground/20 md:w-1/5">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollTo(index)}
            className="absolute inset-y-0 cursor-pointer"
            style={{
              left: `${(index / count) * 100}%`,
              width: `${100 / count}%`,
            }}
            aria-label={`Go to collection ${index + 1}`}
            aria-current={index === selectedIndex ? "true" : undefined}
          />
        ))}

        <span
          className="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-foreground transition-transform duration-500 ease-out"
          style={{
            width: `${100 / count}%`,
            transform: `translateX(${selectedIndex * 100}%)`,
          }}
        />
      </div>
    </>
  );
}
