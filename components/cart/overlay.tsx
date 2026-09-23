"use client";

import { useCart } from "@shopify/hydrogen/react";
import { XIcon } from "lucide-react";

import { cn } from "cn";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";

import { useCartDrawer } from "./context";
import { OverlayContent } from "./overlay-content";

function CartCountBadge() {
  const count = useCart((state) => state.data.totalQuantity);
  if (count === 0) return null;
  return (
    <span className="flex size-4.5 items-center justify-center rounded-full bg-foreground text-xs text-background">
      {count}
    </span>
  );
}

interface CartOverlayProps {
  description: string;
  title: string;
}

export function CartOverlay({ description, title }: CartOverlayProps) {
  const { isOverlayOpen, setOverlayOpen } = useCartDrawer();

  return (
    <Sheet open={isOverlayOpen} onOpenChange={setOverlayOpen}>
      <SheetContent
        closeButton={false}
        overlay={false}
        side="right"
        className="bg-transparent border-none shadow-none gap-0 px-4 py-2"
      >
        <div className="flex flex-col flex-1 bg-background border border-border/40 rounded-md">
          <div className="flex h-16 shrink-0 items-center justify-between gap-2 p-2 sm:p-4 border-b border-border/40">
            <div className="flex items-center gap-1.5">
              <SheetTitle className="text-base font-semibold">{title}</SheetTitle>
              <CartCountBadge />
            </div>
            <SheetClose
              aria-label="Close cart"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon-sm" }),
                "flex cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground",
              )}
            >
              <XIcon className="size-4.5" />
            </SheetClose>
          </div>
          <SheetDescription className="sr-only">{description}</SheetDescription>
          <OverlayContent />
        </div>
      </SheetContent>
    </Sheet>
  );
}
