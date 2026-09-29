"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { ProductCard } from "@/components/product-card/product-card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel";
import type { ProductCard as Product } from "@/lib/product/types";

interface ProductCarouselProps {
  products: Product[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
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
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-[82%] pl-2 sm:basis-[45%] md:basis-1/3 md:pl-2 lg:basis-[24%]"
            >
              <ProductCard product={product} outOfStockText="Out of Stock" />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselUI />
      </Carousel>
    </div>
  );
}

function CarouselUI() {
  const { api, canScrollNext, canScrollPrev } = useCarousel();
  const [currentSnap, setCurrentSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(1);

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setCurrentSnap(api.selectedScrollSnap());
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

  if (!api) return null;

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-between px-4 opacity-0 transition-opacity duration-300 group-hover/carousel:opacity-100 md:flex">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="pointer-events-auto size-10 rounded-full border-white bg-background/60 text-foreground backdrop-blur-sm transition-all hover:bg-background disabled:pointer-events-none disabled:opacity-0"
          onClick={() => api.scrollPrev()}
          disabled={!canScrollPrev}
          aria-label="Previous products"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="pointer-events-auto size-10 rounded-full border-white bg-background/60 text-foreground backdrop-blur-sm transition-all hover:bg-background disabled:pointer-events-none disabled:opacity-0"
          onClick={() => api.scrollNext()}
          disabled={!canScrollNext}
          aria-label="Next products"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div className="relative mx-auto mt-2 h-8 w-[28%] md:w-[12%]">
        <div
          className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-muted-foreground/20"
          role="progressbar"
          aria-label="Product carousel progress"
          aria-valuemin={0}
          aria-valuemax={Math.max(snapCount - 1, 1)}
          aria-valuenow={currentSnap}
        >
          <span
            className="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-foreground transition-transform duration-500 ease-out"
            style={{
              width: `${100 / snapCount}%`,
              transform: `translateX(${currentSnap * 100}%)`,
            }}
          />
        </div>
      </div>
    </>
  );
}
