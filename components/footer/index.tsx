import { cn } from "cn";
import Link from "next/link";
import type { ReactNode } from "react";

import { Logo } from "@/bigbistudio/components/Logo";
import { PaymentMethods } from "@/bigbistudio/components/PaymentMethods";
import { Container } from "@/components/ui/container";
import { Sections } from "@/components/ui/sections";
import { shopConfig } from "@/lib/config";
import { getMenu } from "@/lib/menu/server";
import { getShopPolicies } from "@/lib/policies/server";
import type { MenuItem } from "@/lib/shopify/transforms/menu/types";

import { SocialLinks } from "./social-links";
import type { SocialLink } from "./social-links";

export async function Footer() {
  const socialLinks: SocialLink[] = [
    { platform: "facebook", url: "https://www.facebook.com/" },
    { platform: "github", url: "https://github.com/" },
    { platform: "instagram", url: "https://www.instagram.com/" },
    { platform: "linkedin", url: "https://www.linkedin.com/" },
    { platform: "pinterest", url: "https://www.pinterest.com/" },
    { platform: "tiktok", url: "https://www.tiktok.com/" },
    { platform: "x", url: "https://x.com/" },
    { platform: "youtube", url: "https://www.youtube.com/" },
  ];
  const [shopMenu, exploreMenu, helpMenu, policies] = await Promise.all([
    getMenu({ handle: "footer-shop" }),
    getMenu({ handle: "footer-explore" }),
    getMenu({ handle: "footer-help" }),
    getShopPolicies({}).catch(() => []),
  ]);
  const menus = [
    { menu: shopMenu, title: "Shop" },
    { menu: exploreMenu, title: "Explore" },
    { menu: helpMenu, title: "Help" },
  ];
  return (
    <footer>
      {/* pb-22 clears the fixed agent ActionBar pill when it renders */}
      <Container className={cn("pt-20 pb-10", shopConfig.agent.isEnabled && "pb-22")}>
        <Sections className="gap-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
            <div className="max-w-80 space-y-6">
              <Link className="flex items-center shrink-0 flex-1 lg:flex-none" href="/">
                <Logo
                  src="/logo.svg"
                  alt={shopConfig.site.name}
                  width={180}
                  height={36}
                  className="active:scale-[0.99] transition-transform duration-150"
                />
              </Link>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm leading-6 text-muted-foreground">
                  High quality commerce data for your storefront.
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  Made in small runs. Buy less. Keep it longer.
                </p>
              </div>
            </div>
            <FooterMenu menus={menus} />
          </div>
          <div className="grid gap-10 border-t border-border/60 pt-8">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              {socialLinks.length > 0 && (
                <div className="flex justify-center lg:justify-start">
                  <SocialLinks links={socialLinks} />
                </div>
              )}
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-end">
                {policies.map((policy) => (
                  <Link
                    key={policy.handle}
                    href={`/policies/${policy.handle}`}
                    className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {policy.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <p className="text-center text-sm leading-5 text-muted-foreground lg:text-left">
                {`© 2026 ${shopConfig.site.name}`}
              </p>
              <div className="lg:justify-self-end">
                <PaymentMethods />
              </div>
            </div>
          </div>
        </Sections>
      </Container>
    </footer>
  );
}

interface MenuLinkProps {
  children: ReactNode;
  className?: string;
  url: string;
}

function MenuLink({ url, children, className }: MenuLinkProps) {
  if (url.startsWith("http")) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={url} className={className}>
      {children}
    </Link>
  );
}

function FooterMenu({ menus }: { menus: { menu: { items: MenuItem[] } | null; title: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
      {menus.map(({ menu, title }) => (
        <div key={title} className="space-y-6 lg:min-w-40">
          <h3 className="text-sm font-semibold">{title}</h3>
          {menu && menu.items.length > 0 && (
            <ul className="space-y-6">
              {menu.items.map((item) => (
                <li key={item.id}>
                  <MenuLink
                    url={item.url}
                    className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.title}
                  </MenuLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
