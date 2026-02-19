"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Globe, Layout, BarChart3 } from "lucide-react";

interface Service {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

const services: readonly Service[] = [
  {
    title: "Sites Web",
    description:
      "Sites vitrines et e-commerce sur mesure, rapides et optimisés SEO.",
    icon: Globe,
  },
  {
    title: "Applications Web",
    description:
      "Applications React/Next.js performantes et évolutives pour vos besoins métier.",
    icon: Layout,
  },
  {
    title: "Stratégie Digitale",
    description:
      "Audit, conseil et accompagnement pour maximiser votre présence en ligne.",
    icon: BarChart3,
  },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function ServicesSection() {
  return (
    <section className="py-24 sm:py-28 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Nos services
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground sm:text-lg">
            Des solutions sur mesure pour répondre à tous vos besoins digitaux.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} variants={cardVariants}>
                <Card className="group relative h-full overflow-hidden border-2 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <CardHeader className="relative">
                    <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15">
                      <Icon className="size-6" aria-hidden />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
