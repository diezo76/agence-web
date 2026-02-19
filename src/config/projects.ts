/**
 * Données des projets - Galerie
 */

export type ProjectCategory = "tous" | "sites" | "applications" | "ecommerce" | "branding";

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly longDescription: string;
  readonly image: string;
  readonly images?: readonly string[];
  readonly category: Exclude<ProjectCategory, "tous">;
  readonly tags: readonly string[];
  readonly href?: string;
  readonly year: string;
  readonly client?: string;
}

export const PROJECT_CATEGORIES: readonly { value: ProjectCategory; label: string }[] = [
  { value: "tous", label: "Tous" },
  { value: "sites", label: "Sites Web" },
  { value: "applications", label: "Applications" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "branding", label: "Branding" },
] as const;

export const PROJECTS: readonly Project[] = [
  {
    id: "1",
    title: "Restaurant Le Gourmet",
    description: "Site vitrine moderne pour restaurant gastronomique.",
    longDescription:
      "Refonte complète du site web avec réservation en ligne, menu interactif et galerie photos. Design épuré mettant en valeur l'univers culinaire du chef.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
    ],
    category: "sites",
    tags: ["React", "Next.js", "Tailwind"],
    year: "2024",
    client: "Le Gourmet",
  },
  {
    id: "2",
    title: "Dashboard Analytics",
    description: "Application de visualisation de données en temps réel.",
    longDescription:
      "Dashboard complet avec graphiques interactifs, export de rapports et alertes personnalisées. Interface intuitive pour les équipes marketing.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    category: "applications",
    tags: ["React", "D3.js", "TypeScript"],
    year: "2024",
    client: "TechCorp",
  },
  {
    id: "3",
    title: "Boutique Mode Éthique",
    description: "E-commerce dédié à la mode durable.",
    longDescription:
      "Plateforme e-commerce avec filtres avancés, paiement sécurisé et suivi de livraison. Mise en avant des engagements éthiques des marques.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    category: "ecommerce",
    tags: ["Next.js", "Stripe", "Supabase"],
    year: "2024",
    client: "EcoStyle",
  },
  {
    id: "4",
    title: "Identité Café Artisan",
    description: "Charte graphique et identité visuelle pour torréfacteur.",
    longDescription:
      "Création de l'identité complète : logo, palette de couleurs, typographies et supports de communication. Univers chaleureux et artisanal.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    category: "branding",
    tags: ["Logo", "Identité", "Print"],
    year: "2023",
    client: "Café Artisan",
  },
  {
    id: "5",
    title: "Portfolio Architecte",
    description: "Site portfolio pour cabinet d'architecture.",
    longDescription:
      "Présentation des réalisations avec galerie immersive et visites virtuelles. Mise en avant du processus créatif et des matériaux.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
    category: "sites",
    tags: ["Next.js", "3D", "Framer Motion"],
    year: "2024",
    client: "Atelier Blanc",
  },
  {
    id: "6",
    title: "App Gestion Projet",
    description: "Outil collaboratif pour équipes à distance.",
    longDescription:
      "Application de gestion de projets avec tableaux Kanban, chat intégré et synchronisation temps réel. Conçue pour les équipes distribuées.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    category: "applications",
    tags: ["React", "WebSocket", "PostgreSQL"],
    year: "2023",
    client: "RemoteTeam",
  },
  {
    id: "7",
    title: "Marketplace Artisans",
    description: "Place de marché pour créateurs locaux.",
    longDescription:
      "Plateforme mettant en relation artisans et acheteurs. Système de vente multi-vendeurs, avis et messagerie intégrée.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    category: "ecommerce",
    tags: ["Next.js", "Marketplace", "Stripe"],
    year: "2024",
    client: "Artisans & Co",
  },
  {
    id: "8",
    title: "Rebrand Startup Fintech",
    description: "Refonte identité pour scale-up fintech.",
    longDescription:
      "Nouvelle identité visuelle pour accompagner la levée de fonds. Logo, site web et supports marketing cohérents.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",
    category: "branding",
    tags: ["Branding", "Web", "Motion"],
    year: "2024",
    client: "PayFlow",
  },
] as const;
