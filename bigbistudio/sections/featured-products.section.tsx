"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ProductCarousel } from "@/bigbistudio/components/products/product-carousel";
import { Container } from "@/components/ui/container";
import type { ProductCard as Product } from "@/lib/product/types";

interface FeaturedProductsSectionProps {
  products: Product[];
}

export function FeaturedProductsSection({
  products,
}: FeaturedProductsSectionProps) {
  const [showViewAll, setShowViewAll] = useState(false);

  if (products.length === 0) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <div className="mb-6 flex items-center justify-between md:mb-8">
          <h2 className="text-xl font-medium tracking-tighter md:text-2xl">
            Featured Products
          </h2>

          <div className="inline-flex items-center text-muted-foreground">
            <Link
              href="/collections/all"
              className={`overflow-hidden whitespace-nowrap text-[13px] underline decoration-1 underline-offset-2 transition-all duration-300 ease-out md:text-sm ${
                showViewAll ? "mr-2 max-w-20 opacity-100" : "max-w-0 opacity-0"
              }`}
              tabIndex={showViewAll ? 0 : -1}
              aria-hidden={!showViewAll}
            >
              View all
            </Link>

            <button
              type="button"
              aria-label={showViewAll ? "Hide View all" : "Show View all"}
              aria-expanded={showViewAll}
              onClick={() => setShowViewAll((value) => !value)}
              className="flex size-3.5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-current md:size-4.5"
            >
              <Plus
                className={`size-2.5 transition-transform duration-300 ${
                  showViewAll ? "rotate-45" : "rotate-0"
                }`}
              />
            </button>
          </div>
        </div>
      </Container>

      <div className="w-full overflow-hidden">
        <Container>
          <div className="[&_[data-slot=carousel-content]]:overflow-visible">
            <ProductCarousel products={products} />
          </div>
        </Container>
      </div>
    </section>
  );
}
