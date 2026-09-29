"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type LogoLinkProps = {
  children: ReactNode;
};

export function LogoLink({ children }: LogoLinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname !== "/") {
      return;
    }

    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="flex shrink-0 flex-1 cursor-pointer touch-manipulation items-center transition-transform duration-150 active:scale-[1.02] lg:flex-none"
    >
      {children}
    </Link>
  );
}
