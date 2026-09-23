import { UserRoundCheckIcon, UserRoundIcon } from "lucide-react";
import Link from "next/link";

import { isCustomerLoggedIn } from "@/lib/auth/server";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export async function NavAccount() {
  const loggedIn = await isCustomerLoggedIn();
  if (!loggedIn) {
    // Sign-in must be a full document navigation; the proxy auth route issues an OAuth redirect and must never be prefetched.
    return (
      // eslint-disable-next-line next/no-html-link-for-pages
      <a
        href="/account/login"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-sm" }),
          "flex items-center justify-center text-foreground hover:text-foreground/80 transition-colors",
        )}
      >
        <UserRoundIcon className="size-4.5" strokeWidth={1.6} />
        <span className="sr-only">Sign in</span>
      </a>
    );
  }
  return (
    <Link
      href="/account"
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon-sm" }),
        "flex items-center justify-center text-foreground hover:text-foreground/80 transition-colors",
      )}
    >
      <UserRoundCheckIcon className="size-4.5" strokeWidth={1.6} />
      <span className="sr-only">Account</span>
    </Link>
  );
}

export function NavAccountFallback() {
  return (
    <span className="flex items-center justify-center text-foreground">
      <UserRoundIcon className="size-4.5" strokeWidth={1.6} />
    </span>
  );
}
