"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

import { CollectionCard, type Collection } from "./collection-card";

type CollectionCarouselProps = {
  collections: Collection[];
};

type CarouselUIProps = {
  totalItems: number;
};

export function CollectionCarousel({ collections }: CollectionCarouselProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="group/carousel relative -mx-5 md:mx-0">
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent className="mx-3 md:-ml-2 md:mr-0">
          {collections.map((collection) => (
            <CarouselItem
              key={collection.handle}
              className="basis-[82%] pl-2 sm:basis-[45%] md:basis-1/3 md:pl-2 xl:basis-[23%]"
            >
              <CollectionCard collection={collection} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {mounted && <CarouselUI totalItems={collections.length} />}
      </Carousel>
    </div>
  );
}

function CarouselUI({ totalItems }: CarouselUIProps) {
  const { api } = useCarousel();

  const [step, setStep] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    const updateStep = () => {
      if (window.innerWidth >= 1024) {
        setStep(4);
      } else if (window.innerWidth >= 768) {
        setStep(2);
      } else {
        setStep(1);
      }
    };

    updateStep();

    window.addEventListener("resize", updateStep);

    return () => {
      window.removeEventListener("resize", updateStep);
    };
  }, []);

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setCurrentIndex(api.selectedScrollSnap());
      setSnapCount(api.scrollSnapList().length);
    };

    update();

    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  const pageTargets = useMemo(() => {
    if (!snapCount) return [];

    const targets: number[] = [];

    for (let index = 0; index < snapCount; index += step) {
      targets.push(index);
    }

    const lastSnap = snapCount - 1;

    if (targets[targets.length - 1] !== lastSnap) {
      targets.push(lastSnap);
    }

    return targets;
  }, [snapCount, step]);

  const pageCount = pageTargets.length;

  const currentPage = useMemo(() => {
    if (!pageTargets.length) return 0;

    let closestPage = 0;

    pageTargets.forEach((target, index) => {
      if (
        Math.abs(target - currentIndex) <
        Math.abs(pageTargets[closestPage] - currentIndex)
      ) {
        closestPage = index;
      }
    });

    return closestPage;
  }, [currentIndex, pageTargets]);

  const canScrollPrev = currentPage > 0;
  const canScrollNext = currentPage < pageCount - 1;

  const scrollPrev = useCallback(() => {
    if (!api || !canScrollPrev) return;

    api.scrollTo(pageTargets[currentPage - 1]);
  }, [api, canScrollPrev, currentPage, pageTargets]);

  const scrollNext = useCallback(() => {
    if (!api || !canScrollNext) return;

    api.scrollTo(pageTargets[currentPage + 1]);
  }, [api, canScrollNext, currentPage, pageTargets]);

  const scrollToPage = useCallback(
    (page: number) => {
      if (!api || !pageTargets[page]) return;

      api.scrollTo(pageTargets[page]);
    },
    [api, pageTargets],
  );

  if (!api || !pageCount) return null;

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden -translate-y-[calc(50%+24px)] items-center justify-between px-4 transition-opacity duration-300 md:flex">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="pointer-events-auto size-10 rounded-full border-white bg-background/60 text-foreground backdrop-blur-sm transition-all hover:bg-background disabled:pointer-events-none disabled:opacity-0"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous collections"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="pointer-events-auto size-10 rounded-full border-white bg-background/60 text-foreground backdrop-blur-sm transition-all hover:bg-background disabled:pointer-events-none disabled:opacity-0"
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next collections"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div className="relative mx-auto mt-2 h-8 w-[28%] md:w-[12%]">
        <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-muted-foreground/20">
          <span
            className="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-foreground transition-transform duration-500 ease-out"
            style={{
              width: `${100 / pageCount}%`,
              transform: `translateX(${currentPage * 100}%)`,
            }}
          />
        </div>

        {pageTargets.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToPage(index)}
            className="absolute top-1/2 h-8 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${(index / pageCount) * 100}%`,
              width: `${100 / pageCount}%`,
            }}
            aria-label={`Go to collection group ${index + 1}`}
            aria-current={index === currentPage ? "true" : undefined}
          />
        ))}
      </div>
    </>
  );
}
