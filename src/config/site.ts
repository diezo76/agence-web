import type { LucideIcon } from "lucide-react";
import { Twitter, Linkedin, Github } from "lucide-react";

export interface NavItem {
  readonly title: string;
  readonly href: string;
}

export interface SocialLink {
  readonly name: string;
  readonly href: string;
  readonly icon: LucideIcon;
}

/**
 * Configuration du site - Agence Web
 */
export const siteConfig = {
  name: "Agence Web",
  description: "Votre partenaire digital pour des solutions web modernes",
  url: "https://example.com",
  nav: [
    { title: "Accueil", href: "/" },
    { title: "Services", href: "/services" },
    { title: "Projets", href: "/projets" },
    { title: "À propos", href: "/a-propos" },
    { title: "Contact", href: "/contact" },
  ],
  socialLinks: [
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "GitHub", href: "https://github.com", icon: Github },
  ] as const,
  footerColumns: [
    {
      title: "Navigation",
      links: [
        { title: "Accueil", href: "/" },
        { title: "Services", href: "/services" },
        { title: "Projets", href: "/projets" },
        { title: "À propos", href: "/a-propos" },
        { title: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { title: "Sites Web", href: "/services#sites" },
        { title: "Applications", href: "/services#applications" },
        { title: "Stratégie", href: "/services#strategie" },
      ],
    },
    {
      title: "Légal",
      links: [
        { title: "Mentions légales", href: "/mentions-legales" },
        { title: "Politique de confidentialité", href: "/confidentialite" },
        { title: "CGU", href: "/cgu" },
      ],
    },
  ] as const,
} as const;
