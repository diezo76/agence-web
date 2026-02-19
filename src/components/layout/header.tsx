"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl supports-[backdrop-filter]:bg-black/30">
      <div className="container flex h-14 min-h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 font-bold text-lg text-white sm:text-xl"
        >
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden rounded-full bg-white font-semibold text-black hover:bg-white/90 md:inline-flex"
          >
            <Link href="/contact">Contact</Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
