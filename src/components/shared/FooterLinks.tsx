"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LinkItem {
  readonly title: string;
  readonly href: string;
}

interface FooterLinksProps {
  title: string;
  links: readonly LinkItem[];
  className?: string;
}

export function FooterLinks({ title, links, className }: FooterLinksProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h4 className="font-semibold text-foreground">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
