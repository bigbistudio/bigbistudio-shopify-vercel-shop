import Link from "next/link";
import { Suspense } from "react";

import { CollectionViewedTracker } from "@/components/analytics/trackers";
import { CollectionResultsGrid } from "@/components/collections/results-grid";
import { BrowseFallback, BrowseToolbar } from "@/components/collections/toolbar";
import { BreadcrumbSchema } from "@/components/schema/breadcrumb-schema";
import { CollectionSchema } from "@/components/schema/collection-schema";
import { Container } from "@/components/ui/container";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import type {
  CollectionResultsData,
  CollectionSearchState,
  Collection,
} from "@/lib/collections/types";

import { CollectionBrowseProvider } from "./collection-browse-provider";
import { FilterPendingScope } from "./filter-pending-context";

export function CollectionDetailPage({
  collection,
  collectionResultsDataPromise,
  handle,
  searchStatePromise,
  sortExclude,
}: {
  collection: Collection;
  collectionResultsDataPromise: Promise<CollectionResultsData>;
  handle: string;
  searchStatePromise: Promise<CollectionSearchState>;
  sortExclude?: string[];
}) {
  return (
    <>
      {collection.id ? (
        <CollectionViewedTracker collection={{ handle: collection.handle, id: collection.id }} />
      ) : null}
      <Page className="py-10 lg:py-20">
        <Container>
          <Sections className="gap-5 pb-20">
            <CollectionHeader collection={collection} handle={handle} homeLabel="Home" />

            <Suspense fallback={<BrowseFallback />}>
              <CollectionBrowseProvider handle={handle} searchStatePromise={searchStatePromise}>
                <BrowseToolbar
                  facetsPromise={collectionResultsDataPromise.then(
                    (data) => data.transformedFilters,
                  )}
                  sortExclude={sortExclude}
                />

                <FilterPendingScope>
                  <CollectionResultsGrid
                    collectionResultsDataPromise={collectionResultsDataPromise}
                  />
                </FilterPendingScope>
              </CollectionBrowseProvider>
            </Suspense>
          </Sections>
        </Container>
      </Page>
    </>
  );
}

function CollectionHeader({
  collection,
  handle,
  homeLabel,
}: {
  collection: Collection;
  handle: string;
  homeLabel: string;
}) {
  const { title, description, updatedAt } = collection;

  const breadcrumbItems = [
    { name: homeLabel, path: "/" },
    { name: title, path: `/collections/${handle}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <CollectionSchema collection={{ handle, title, description, updatedAt }} />
      <div>
        <h1 className="text-xl lg:text-3xl font-medium">
          <Link href={`/collections/${handle}`}>{title}</Link>
        </h1>
        {description && (
          <p className="text-[13px] lg:text-sm mt-4 leading-5 lg:leading-6 text-foreground max-w-xl">{description}</p>
        )}
        <nav aria-label="Breadcrumb" className="mt-6 mb-2 text-[13px] text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link className="transition-colors hover:text-foreground" href="/">
                {homeLabel}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {title}
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
}
