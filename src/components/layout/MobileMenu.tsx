"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { useScrollLock } from "@/lib/hooks";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  useScrollLock(open);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        className="p-2"
      >
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {open && (
        <div
          className="fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur"
          aria-hidden={!open}
        >
          <nav className="flex flex-col gap-4 p-6">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium text-foreground hover:text-primary"
              >
                {item.title}
              </Link>
            ))}
            <Button asChild className="mt-4">
              <Link href="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
}
