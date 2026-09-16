import { PredictiveSearchProvider } from "@shopify/hydrogen/react";
import Link from "next/link";
import { Suspense } from "react";

import { Container } from "@/components/ui/container";
import { shopConfig } from "@/lib/config";
import type { MenuItem } from "@/lib/shopify/transforms/menu/types";
import { Logo } from "@/bigbistudio/components/Logo";

import { NavAccount, NavAccountFallback } from "./account";
import { CartIcon, CartIconFallback } from "./cart";
import { MobileMenu } from "./mobile-menu";
import { QuickLinks } from "./quick-links";
import { SearchModal } from "./search-modal";

export function Nav() {
  const items: MenuItem[] = [
    { id: "default-nav-shop", title: "Shop", url: "/collections/all", type: "HTTP", items: [] },
  ];
  return (
    <nav
      className="sticky top-0 z-30 w-full bg-transparent pt-[env(safe-area-inset-top,0px)] transition-shadow duration-250"
      id="nav-outer"
    >
      <Container className="flex justify-center py-2">
        <div className="flex h-12 items-center gap-2.5 md:gap-5 px-2 py-2 bg-background border border-border/40 rounded-md w-full max-w-6xl">
          <MobileMenu items={items} />

          <Link className="flex items-center shrink-0" href="/">
            <Logo
              src="/logo.svg"
              alt={shopConfig.site.name}
              className="active:scale-[0.99] transition-transform duration-150"
            />
          </Link>

          <QuickLinks items={items} />

          <div className="flex items-center gap-5 ml-auto">
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
