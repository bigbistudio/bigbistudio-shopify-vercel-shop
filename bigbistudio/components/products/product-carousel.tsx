"use client";

import { useCallback, useEffect, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { ProductCard } from "@/components/product-card/product-card";

import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";

import type { ProductCard as Product } from "@/lib/product/types";

interface ProductCarouselProps {
  products: Product[];
}

type CarouselUIProps = {
  totalItems: number;
};

export function ProductCarousel({ products }: ProductCarouselProps) {
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
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-[82%] pl-2 sm:basis-[45%] md:basis-1/3 md:pl-2 lg:basis-[21.1%]"
            >
              <ProductCard product={product} outOfStockText="Out of Stock" />
            </CarouselItem>
          ))}
        </CarouselContent>

        {mounted && <CarouselUI totalItems={products.length} />}
      </Carousel>
    </div>
  );
}

function CarouselUI({ totalItems }: CarouselUIProps) {
  const { api } = useCarousel();

  const [step, setStep] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    };

    update();

    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  const pageCount = Math.ceil(totalItems / step);

  const currentPage = Math.min(Math.floor(currentIndex / step), pageCount - 1);

  const canScrollPrev = currentPage > 0;
  const canScrollNext = currentPage < pageCount - 1;

  const scrollPrev = useCallback(() => {
    if (!api || !canScrollPrev) return;

    const target = Math.max(0, currentPage * step - step);

    api.scrollTo(target);
  }, [api, canScrollPrev, currentPage, step]);

  const scrollNext = useCallback(() => {
    if (!api || !canScrollNext) return;

    const target = Math.min(totalItems - 1, (currentPage + 1) * step);

    api.scrollTo(target);
  }, [api, canScrollNext, currentPage, step, totalItems]);

  const scrollToPage = useCallback(
    (page: number) => {
      if (!api) return;

      const target = Math.min(totalItems - 1, page * step);

      api.scrollTo(target);
    },
    [api, step, totalItems],
  );

  if (!api || pageCount <= 0) return null;

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden -translate-y-[calc(50%+44px)] items-center justify-between px-4 opacity-0 transition-opacity duration-300 group-hover/carousel:opacity-100 md:flex">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="pointer-events-auto size-10 rounded-full border-white bg-background/60 text-foreground backdrop-blur-sm transition-all hover:bg-background disabled:pointer-events-none disabled:opacity-0"
          onClick={scrollPrev}
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
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next products"
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

        {Array.from({ length: pageCount }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToPage(index)}
            className="absolute top-1/2 h-8 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${(index / pageCount) * 100}%`,
              width: `${100 / pageCount}%`,
            }}
            aria-label={`Go to product group ${index + 1}`}
            aria-current={index === currentPage ? "true" : undefined}
          />
        ))}
      </div>
    </>
  );
}
