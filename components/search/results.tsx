import { Suspense } from "react";

import {
  FilterPendingScope,
  ProductGridPendingOverlay,
} from "@/components/collections/filter-pending-context";
import { InfiniteProductGrid } from "@/components/collections/infinite-product-grid";
import { ProductCard } from "@/components/product-card/product-card";
import { ProductsGridSkeleton } from "@/components/product/products-grid";
import { PRODUCTS_PER_PAGE } from "@/lib/collections";
import { loadMoreSearchProductsAction } from "@/lib/search/action";
import type { SearchResultsData } from "@/lib/search/types";

export function SearchResultsGrid({
  searchResultsDataPromise,
}: {
  searchResultsDataPromise: Promise<SearchResultsData>;
}) {
  return (
    <Suspense
      fallback={
        <ProductsGridSkeleton
          count={PRODUCTS_PER_PAGE}
          className="grid gap-2 md:grid-cols-2 lg:grid-cols-3"
        />
      }
    >
      <SearchResultsGridRender searchResultsDataPromise={searchResultsDataPromise} />
    </Suspense>
  );
}

async function SearchResultsGridRender({
  searchResultsDataPromise,
}: {
  searchResultsDataPromise: Promise<SearchResultsData>;
}) {
  const data = await searchResultsDataPromise;
  const { collection, dataSearch, products, query } = data;
  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl mb-2">No products found</h2>
        <p className="text-muted-foreground">
          {query ? `We couldn't find any products matching "${query}"` : "No products available"}
        </p>
      </div>
    );
  }
  return (
    <FilterPendingScope>
      <ProductGridPendingOverlay>
        <InfiniteProductGrid
          key={`${query ?? ""}|${collection ?? ""}|${dataSearch}`}
          initialProducts={products}
          initialPageInfo={data.pageInfo}
          outOfStockText="Out of Stock"
          loadMore={loadMoreSearchProductsAction}
          loadMoreParams={{
            collection,
            query,
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} outOfStockText="Out of Stock" />
          ))}
        </InfiniteProductGrid>
      </ProductGridPendingOverlay>
    </FilterPendingScope>
  );
}
