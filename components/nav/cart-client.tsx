"use client";

import { useCart } from "@shopify/hydrogen/react";
import { HandbagIcon } from "lucide-react";

import { useCartDrawer } from "@/components/cart/context";
import { Button } from "@/components/ui/button";

interface CartIconClientProps {
  cartLabel: string;
  initialCart: { totalQuantity: number } | null;
}

export function CartIconClient({ cartLabel, initialCart }: CartIconClientProps) {
  const quantity = useCart((state) =>
    state.loading
      ? (initialCart?.totalQuantity ?? state.data.totalQuantity)
      : state.data.totalQuantity,
  );
  const { openOverlay } = useCartDrawer();

  return (
    <Button variant="ghost" size="icon-sm" onClick={openOverlay}>
      <span className="relative">
        <HandbagIcon className="size-4.5" strokeWidth={1.6} />
        {quantity > 0 && (
          <span className="absolute -top-2 -right-1 flex size-4 items-center justify-center rounded-full bg-foreground text-xxs leading-none text-background">
            {quantity}
          </span>
        )}
      </span>
      <span className="sr-only">{cartLabel}</span>
    </Button>
  );
}
