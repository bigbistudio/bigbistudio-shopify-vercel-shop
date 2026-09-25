import type { Metadata } from "next";

import { ProductsGrid } from "@/components/product/products-grid";
import { Container } from "@/components/ui/container";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
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
        <section className="grid py-20 h-[40vh]">
         
        </section>
      </Sections>
    </Page>
  );
}
