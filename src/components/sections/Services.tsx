"use client";

import { ScaleIn, ScrollReveal } from "@/components/animations";
import { FloatingCard } from "@/components/shared";
import { fadeInUp } from "@/lib/animations/variants";

const SERVICES = [
  {
    icon: "🎨",
    title: "Design UI/UX",
    description:
      "Interfaces modernes et intuitives qui captivent vos utilisateurs.",
  },
  {
    icon: "⚡",
    title: "Développement",
    description:
      "Applications performantes avec les dernières technologies web.",
  },
  {
    icon: "🚀",
    title: "SEO",
    description:
      "Visibilité maximale sur les moteurs de recherche.",
  },
  {
    icon: "🌐",
    title: "Web3",
    description:
      "Intégration blockchain et fonctionnalités décentralisées.",
  },
] as const;

export default function Services() {
  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal variants={fadeInUp}>
          <h2 className="mb-16 text-center text-6xl font-bold">
            Nos Services
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <ScaleIn key={service.title} delay={index * 0.1}>
              <FloatingCard delay={index * 0.2}>
                <div className="p-8 text-center">
                  <div className="mb-4 text-6xl">{service.icon}</div>
                  <h3 className="mb-2 text-2xl font-bold">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </FloatingCard>
            </ScaleIn>
          ))}
        </div>
      </div>
    </section>
  );
}
