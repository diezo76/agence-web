"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={cn("flex gap-4", className)}>
      {siteConfig.socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon className="size-5" aria-hidden />
          </Link>
        );
      })}
    </div>
  );
}
