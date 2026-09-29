import type { Metadata } from "next";
import { io } from "next/cache";
import { Suspense } from "react";

import {
  CollectionSection,
  FeaturedProductsSection,
  HeroBannerSection,
} from "@/bigbistudio/sections";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import { getCollectionResultsData, getCollectionSearchState } from "@/lib/collections/server";
import { shopConfig } from "@/lib/config";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Home";
  const description = "Explore featured products, curated collections, and seasonal campaigns.";
  return {
    title: `${title} | ${shopConfig.site.name}`,
    description,
    alternates: buildAlternates({ pathname: "/" }),
    openGraph: buildOpenGraph({
      title,
      description,
      url: "/",
      type: "website",
    }),
  };
}

export default function HomePage() {
  return (
    <Page className="pt-0">
      <Sections>
        <HeroBannerSection />
        <CollectionSection />
        <Suspense fallback={null}>
          <FeaturedProductsData />
        </Suspense>
      </Sections>
    </Page>
  );
}

async function FeaturedProductsData() {
  await io();

  const {
    result: { products },
  } = await getCollectionResultsData({
    handle: "best-sellers-women",
    limit: 8,
    searchStatePromise: getCollectionSearchState(Promise.resolve({})),
  });

  return <FeaturedProductsSection products={products} />;
}
