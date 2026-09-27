"use client";

import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
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

const slides = [
  {
    title: "Modern Tweed",
    description: "A refined take on classic tweed, combining timeless texture with a modern silhouette for effortless elegance.",
    href: "/products/tweed-collared-short-sleeve-dress",
    cta: "Shop the Dress",
    image: "/images/modern-tweed-dress-banner.jpg",
    alt: "Woman wearing a tweed collared dress by the Mediterranean coast",
  },
  {
    title: "Layers to Love",
    description: "Soft textures and timeless silhouettes designed for effortless layering, comfort, and understated elegance.",
    href: "/collections/cardigans",
    cta: "Shop Cardigans",
    image: "/images/cardigans-collection-banner.jpg",
    alt: "Cardigans collection",
  },
  {
    title: "The Midi Edit",
    description: "Elegant lengths and fluid silhouettes designed to move with you, bringing effortless versatility to every occasion.",
    href: "/collections/midi-skirts",
    cta: "Shop Midi Skirts",
    image: "/images/skirts-collection-banner.jpg",
    alt: "Midi skirts collection",
  },
];

export function HeroBannerSection() {
  return (
    <section className="relative -mt-20">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 60000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent className="ml-0">
          {slides.map((slide) => (
            <CarouselItem key={slide.title} className="pl-0">
              <div className="relative w-full aspect-12/5 overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={slide === slides[0]}
                  sizes="100vw"
                  className="object-cover"
                />

                {/* Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-black/30" />

                {/* Content */}
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

        {/* Navigation */}
        <CarouselPrevious className="left-6 border-white/50 bg-black/10 text-white backdrop-blur-sm hover:bg-white hover:text-black md:left-10" />

        <CarouselNext className="right-6 border-white/50 bg-black/10 text-white backdrop-blur-sm hover:bg-white hover:text-black md:right-10" />
      </Carousel>
    </section>
  );
}
