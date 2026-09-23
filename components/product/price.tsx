import { formatMoney } from "@shopify/hydrogen";
import { cn } from "cn";
import type { ComponentProps } from "react";

import { shopConfig } from "@/lib/config";

interface PriceProps extends ComponentProps<"span"> {
  amount: string;
  currencyCode: string;
}

export function Price({ amount, currencyCode, className, ...props }: PriceProps) {
  const price = formatMoney(
    { amount, currencyCode },
    {
      locale: shopConfig.localization.locale,
    },
  ).localizedString;
  return (
    <span
      className={cn("text-base text-foreground tabular-nums tracking-tight", className)}
      {...props}
    >
      {price}
    </span>
  );
}
