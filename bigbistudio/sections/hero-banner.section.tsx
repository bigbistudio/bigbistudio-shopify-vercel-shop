"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Pause, Play } from "lucide-react";
import { cn } from "cn";

import { Container } from "@/components/ui/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { buttonVariants } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";

const SLIDE_DURATION = 6000;

const slides = [
  {
    title: "Modern Tweed",
    description:
      "A refined take on classic tweed, combining timeless texture with a modern silhouette for effortless elegance.",
    href: "/products/tweed-collared-short-sleeve-dress",
    cta: "Shop the Dress",
    image: "/images/modern-tweed-dress-banner.jpg",
    alt: "Woman wearing a tweed collared dress by the Mediterranean coast",
  },
  {
    title: "Layers to Love",
    description:
      "Soft textures and timeless silhouettes designed for effortless layering, comfort, and understated elegance.",
    href: "/collections/cardigans",
    cta: "Shop Cardigans",
    image: "/images/cardigans-collection-banner.jpg",
    alt: "Cardigans collection",
  },
  {
    title: "The Midi Edit",
    description:
      "Elegant lengths and fluid silhouettes designed to move with you, bringing effortless versatility to every occasion.",
    href: "/collections/midi-skirts",
    cta: "Shop Midi Skirts",
    image: "/images/skirts-collection-banner.jpg",
    alt: "Midi skirts collection",
  },
];

export function HeroBannerSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: SLIDE_DURATION,
        stopOnInteraction: false,
      }),
    [],
  );

  const fade = useMemo(() => Fade(), []);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      setProgressKey((key) => key + 1);
    };

    setCurrent(api.selectedScrollSnap());

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const togglePause = () => {
    if (isPaused) {
      autoplay.play();
      setIsPaused(false);
    } else {
      autoplay.stop();
      setIsPaused(true);
    }
  };

  const goToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section className="relative -mt-20">
      <style>{`
        @keyframes hero-progress {
          from {
            width: 0;
          }

          to {
            width: 100%;
          }
        }
      `}</style>

      <Carousel
        className="w-full"
        setApi={setApi}
        opts={{
          loop: true,
        }}
        plugins={[fade, autoplay]}
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.title} className="pl-0">
              <div className="relative aspect-12/5 w-full overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />

                <div className="pointer-events-none absolute inset-0 bg-black/30" />

                {/* Hero Content */}
                <div className="absolute inset-0 flex items-end">
                  <Container>
                    <div className="p-6 pb-16 text-white md:p-10 md:pb-14 lg:p-14">
                      <div className="max-w-sm space-y-6">
                        <div className="space-y-3">
                          <h1 className="text-3xl font-medium tracking-tight lg:text-4xl">
                            {slide.title}
                          </h1>

                          <p className="text-sm leading-5">{slide.description}</p>
                        </div>

                        <Link
                          href={slide.href}
                          className={cn(buttonVariants({ variant: "outline" }), "text-white")}
                        >
                          {slide.cta}
                        </Link>
                      </div>
                    </div>
                  </Container>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-6 border-white/50 text-white transition-all hover:bg-muted/40 focus-within:scale-110 md:left-10" />

        <CarouselNext className="right-6 border-white/50 text-white transition-all hover:bg-muted/40 focus-within:scale-110 md:right-10" />

        {/* Slide Controls — rendered once */}
        <div className="absolute inset-x-0 bottom-6 z-10 md:bottom-8">
          <Container>
            <div className="flex justify-end px-6 md:px-10 lg:px-14">
              <div className="flex items-center gap-2">
                {/* Pause / Play */}
                <button
                  type="button"
                  onClick={togglePause}
                  aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                  className="flex size-4 shrink-0 items-center justify-center rounded-full text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
                >
                  {isPaused ? (
                    <Play className="size-2.5 fill-current" />
                  ) : (
                    <Pause className="size-2.5 fill-current" />
                  )}
                </button>

                {/* Progress */}
                <div className="flex items-center gap-1.5">
                  {slides.map((slide, index) => {
                    const isActive = current === index;

                    return (
                      <button
                        key={slide.title}
                        type="button"
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className="relative h-1 w-10 overflow-hidden rounded-full bg-white/40"
                      >
                        {isActive && (
                          <span
                            key={progressKey}
                            className="absolute inset-y-0 left-0 w-0 rounded-full bg-white"
                            style={{
                              animation: `hero-progress ${SLIDE_DURATION}ms linear forwards`,
                              animationPlayState: isPaused ? "paused" : "running",
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Carousel>
    </section>
  );
}
