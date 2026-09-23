import { HandbagIcon } from "lucide-react";

import { getCart } from "@/lib/cart/server";
import { withFallback } from "@/lib/shopify/errors/server";
import { Button } from "@/components/ui/button";

import { CartIconClient } from "./cart-client";

export async function CartIcon() {
  const cart = await withFallback(getCart(), undefined);
  return <CartIconClient cartLabel="Cart" initialCart={cart ?? null} />;
}

export function CartIconFallback() {
  return (
    <span className="flex items-center justify-center gap-1.5 text-foreground">
      <Button variant="ghost" size="icon-sm">
        <HandbagIcon className="size-4.5" strokeWidth={1.6} />
      </Button>
      <span className="sr-only">Cart</span>
    </span>
  );
}
