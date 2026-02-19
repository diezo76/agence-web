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
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Multi-column layout */}
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:grid-cols-4">
          {/* Brand + Newsletter */}
          <div className="space-y-6 xl:col-span-2">
            <Link href="/" className="inline-block font-bold text-lg text-white sm:text-xl">
              {siteConfig.name}
            </Link>
            <p className="max-w-sm text-sm text-gray-400">
              {siteConfig.description}
            </p>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white">Newsletter</h3>
              <p className="text-sm text-gray-400">
                Recevez nos actualités et conseils digitaux.
              </p>
              {subscribed ? (
                <p className="text-sm font-medium text-purple-300">
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
                    className="min-w-0 flex-1 bg-white/10 text-white placeholder:text-gray-400"
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
              <h3 className="text-sm font-semibold text-white">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
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
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:mt-16 sm:flex-row">
          <div className="flex items-center gap-4">
            {siteConfig.socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-white"
                  aria-label={social.name}
                >
                  <Icon className="size-5" aria-hidden />
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative flex size-9 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
            >
              <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>
          </div>
          <p className="text-center text-sm text-gray-400 sm:text-left">
            © {currentYear} {siteConfig.name}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}