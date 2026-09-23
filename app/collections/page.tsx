import type { Metadata } from "next";

import { CollectionCard } from "@/components/collections/collection-card";
import { Container } from "@/components/ui/container";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import { getCollectionsListing } from "@/lib/collections/server";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Collections";
  const description = "Browse products by collection.";
  return {
    title,
    description,
    alternates: buildAlternates({
      pathname: "/collections",
    }),
    openGraph: buildOpenGraph({
      title,
      description,
      url: "/collections",
      type: "website",
    }),
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-default.png"],
    },
  };
}

export default async function CollectionsPage() {
  const collections = await getCollectionsListing({});
  const viewCollectionLabel = "View this collection";
  return (
    <Page className="py-10 lg:py-20">
      <Container>
        <Sections className="gap-5">
          <h1 className="text-xl lg:text-3xl font-medium">Collections</h1>

          {collections.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-2 lg:grid-cols-3 lg:py-10">
              {collections.map((collection) => (
                <CollectionCard
                  key={collection.handle}
                  collection={collection}
                  viewCollectionLabel={viewCollectionLabel}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No collections found.</p>
          )}
        </Sections>
      </Container>
    </Page>
  );
}
