"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TimelineDot } from "@/components/sections/timeline/TimelineDot";
import { TimelineLine } from "@/components/sections/timeline/TimelineLine";
import {
  TimelineStep,
  type TimelineStepData,
} from "@/components/sections/timeline/TimelineStep";

const TIMELINE_STEPS: readonly TimelineStepData[] = [
  {
    id: "decouverte",
    number: 1,
    title: "Découverte & Stratégie",
    description:
      "Analyse de vos besoins, étude de la concurrence et définition d'une stratégie digitale sur mesure.",
    icon: "🔍",
  },
  {
    id: "design",
    number: 2,
    title: "Design & Prototypage",
    description:
      "Création de maquettes et prototypes interactifs pour valider l'expérience utilisateur avant le développement.",
    icon: "🎨",
  },
  {
    id: "developpement",
    number: 3,
    title: "Développement",
    description:
      "Construction de votre solution avec les dernières technologies, code propre et maintenable.",
    icon: "⚡",
  },
  {
    id: "tests",
    number: 4,
    title: "Tests & QA",
    description:
      "Tests rigoureux, optimisation des performances et validation sur tous les appareils.",
    icon: "✅",
  },
  {
    id: "lancement",
    number: 5,
    title: "Lancement",
    description:
      "Mise en production, configuration des serveurs et déploiement de votre projet.",
    icon: "🚀",
  },
  {
    id: "support",
    number: 6,
    title: "Support & Évolution",
    description:
      "Accompagnement continu, maintenance et évolutions pour faire grandir votre projet.",
    icon: "📈",
  },
];

export default function Timeline() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 md:py-32">
      {/* Overlay léger */}
      <div className="absolute inset-0 bg-purple-900/10" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col items-center gap-6 sm:mb-12 md:mb-20 md:gap-8"
        >
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Notre Processus
          </h2>
          {/* Nav smooth scroll entre étapes */}
          <nav className="flex flex-wrap justify-center gap-1.5 sm:gap-2" aria-label="Navigation processus">
            {TIMELINE_STEPS.map((step) => (
              <Link
                key={step.id}
                href={`#${step.id}`}
                className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition-colors hover:border-white/40 hover:text-white sm:px-4 sm:py-2 sm:text-sm"
              >
                {step.number}
              </Link>
            ))}
          </nav>
        </motion.div>

        <TimelineLine>
          <div className="relative">
            {TIMELINE_STEPS.map((step, index) => (
              <div
                key={step.id}
                id={step.id}
                className="relative flex min-h-[200px] scroll-mt-24 flex-col items-center gap-4 py-6 sm:min-h-[220px] sm:gap-6 sm:py-8 md:min-h-[200px] md:flex-row md:gap-0 md:py-12"
              >
                {/* Colonne gauche : card pour index pair */}
                <div className="flex w-full max-w-md justify-center md:w-1/2 md:justify-end md:pr-10">
                  {index % 2 === 0 && (
                    <TimelineStep
                      step={step}
                      index={index}
                      isLeft={true}
                    />
                  )}
                </div>

                {/* Centre : dot sur la ligne */}
                <div className="flex w-4 shrink-0 justify-center md:w-8">
                  <TimelineDot index={index} />
                </div>

                {/* Colonne droite : card pour index impair */}
                <div className="flex w-full max-w-md justify-center md:w-1/2 md:justify-start md:pl-10">
                  {index % 2 === 1 && (
                    <TimelineStep
                      step={step}
                      index={index}
                      isLeft={false}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </TimelineLine>
      </div>
    </section>
  );
}
