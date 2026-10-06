"use client";

import type { ReactElement, ReactNode } from "react";
import { XIcon } from "lucide-react";

import { cn } from "cn";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";

interface FilterSidebarSheetProps {
  children: ReactNode;
  label: string;
  trigger: ReactElement;
}

export function FilterSidebarSheet({ children, label, trigger }: FilterSidebarSheetProps) {
  return (
    <Sheet>
      <SheetTrigger render={trigger} />
      <SheetContent
        closeButton={false}
        side="left"
        className="bg-transparent! gap-0 p-4 overflow-y-auto border-none shadow-none [&_[data-slot=filter-sidebar-scroll-fade]]:hidden [&_[data-slot=filter-sidebar]]:overflow-y-visible [&_[data-slot=filter-sidebar]>div]:!pb-0 [&_[data-slot=filter-sidebar-header]]:hidden"
      >
        <div className="bg-card h-full p-4 rounded-lg space-y-2">
          <div className="flex justify-between h-10 shrink-0 items-center gap-2">
            <SheetTitle className="text-lg font-semibold">{label}</SheetTitle>
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
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
