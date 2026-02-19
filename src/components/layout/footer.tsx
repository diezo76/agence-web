"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme, setTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [subscribed, setSubscribed] = useState(false);

  function handleNewsletterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    startTransition(() => {
      // Simuler l'inscription - à connecter à une API
      setSubscribed(true);
      setEmail("");
    });
  }

  return (
    <footer className="border-t bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Multi-column layout */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:grid-cols-4">
          {/* Brand + Newsletter */}
          <div className="space-y-6 xl:col-span-2">
            <Link href="/" className="inline-block font-bold text-xl">
              {siteConfig.name}
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Newsletter</h3>
              <p className="text-sm text-muted-foreground">
                Recevez nos actualités et conseils digitaux.
              </p>
              {subscribed ? (
                <p className="text-sm text-primary font-medium">
                  Merci ! Vous êtes inscrit.
                </p>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col gap-2 sm:flex-row sm:gap-2"
                >
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isPending}
                    className="min-w-0 flex-1 bg-background dark:bg-background/80"
                    aria-label="Adresse email pour la newsletter"
                  />
                  <Button type="submit" disabled={isPending} size="default">
                    {isPending ? "..." : "S'inscrire"}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation columns */}
          {siteConfig.footerColumns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h3 className="text-sm font-semibold">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
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
          ))}
        </div>

        {/* Social links + Theme toggle + Copyright */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t pt-8 sm:flex-row">
          <div className="flex items-center gap-4">
            {siteConfig.socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={social.name}
                >
                  <Icon className="size-5" aria-hidden />
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
            >
              <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>
          </div>
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            © {currentYear} {siteConfig.name}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}