import type { Metadata } from "next";

import {
  CollectionSection,
  FeaturedProductsSection,
  HeroBannerSection,
} from "@/bigbistudio/sections";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import { getCollectionProductCards } from "@/lib/collections/server";
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

export default async function HomePage() {
  const products = await getCollectionProductCards({
    collection: "best-sellers-women",
    limit: 8,
  });

  return (
    <Page className="pt-0">
      <Sections className="gap-0">
        <HeroBannerSection />
        <CollectionSection />
        <FeaturedProductsSection products={products} />
      </Sections>
    </Page>
  );
}
