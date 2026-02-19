import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { ProjectsGallery } from "@/features/projets";
import { ProjectsPageHeader } from "@/features/projets/projects-page-header";
import { PROJECTS } from "@/config/projects";

export const metadata: Metadata = {
  title: "Nos Réalisations | Agence Web",
  description:
    "Découvrez notre portfolio de projets web : sites vitrines, applications, e-commerce et branding. Des réalisations sur mesure pour votre présence digitale.",
  openGraph: {
    title: "Nos Réalisations | Agence Web",
    description:
      "Découvrez notre portfolio de projets web : sites vitrines, applications, e-commerce et branding.",
    type: "website",
  },
};

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Portfolio Agence Web",
  description: "Réalisations web et digitales de l'agence",
  numberOfItems: PROJECTS.length,
  itemListElement: PROJECTS.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      image: project.image,
      dateCreated: project.year,
    },
  })),
};

export default function ProjetsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <Header />
      <main className="flex flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <ProjectsPageHeader />
          <ProjectsGallery />
        </div>
      </main>
      <Footer />
    </div>
  );
}
