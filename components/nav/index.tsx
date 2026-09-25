import { PredictiveSearchProvider } from "@shopify/hydrogen/react";
import Link from "next/link";
import { Suspense } from "react";

import { Logo } from "@/bigbistudio/components/Logo";
import { Container } from "@/components/ui/container";
import { shopConfig } from "@/lib/config";
import { getMenu } from "@/lib/menu/server";
import type { MenuItem } from "@/lib/shopify/transforms/menu/types";

import { NavAccount, NavAccountFallback } from "./account";
import { CartIcon, CartIconFallback } from "./cart";
import { MobileMenu } from "./mobile-menu";
import { QuickLinks } from "./quick-links";
import { SearchModal } from "./search-modal";

export async function Nav() {
  const menu = await getMenu({ handle: "main-menu" });
  const items: MenuItem[] = menu?.items ?? [
    { id: "default-nav-shop", title: "Shop", url: "/collections/all", type: "HTTP", items: [] },
  ];
  return (
    <nav
      className="sticky top-0 z-30 w-full bg-transparent pt-[env(safe-area-inset-top,0px)] transition-shadow duration-250"
      id="nav-outer"
    >
      <Container className="flex justify-center py-2">
        <div className="flex max-h-16 items-center justify-between gap-0.5 lg:gap-4 px-3 py-2 bg-background border border-border/40 rounded-lg w-full lg:w-fit lg:min-w-3xl lg:max-w-full overflow-hidden">
          <MobileMenu items={items} />

          <Link className="flex items-center shrink-0 flex-1 lg:flex-none" href="/">
            <Logo
              src="/logo.svg"
              alt={shopConfig.site.name}
              className="active:scale-[1.02] transition-transform duration-150"
            />
          </Link>

          <QuickLinks items={items} />

          <div className="flex items-center gap-0 sm:gap-1 lg:gap-2">
            {shopConfig.search.isEnabled && (
              <PredictiveSearchProvider
                debounceInMs={300}
                limit={3}
                types={["PRODUCT", "COLLECTION", "QUERY"]}
              >
                <SearchModal />
              </PredictiveSearchProvider>
            )}
            {shopConfig.auth.isEnabled && (
              <Suspense fallback={<NavAccountFallback />}>
                <NavAccount />
              </Suspense>
            )}
            <Suspense fallback={<CartIconFallback />}>
              <CartIcon />
            </Suspense>
          </div>
        </div>
      </Container>
    </nav>
  );
}
