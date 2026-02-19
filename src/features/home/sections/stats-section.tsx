"use client";

import { Stats } from "@/components/sections";
import { AnimatedCounter } from "@/components/shared";

const STATS = [
  { value: 150, label: "Projets réalisés", suffix: "+" },
  { value: 98, label: "Clients satisfaits", suffix: "%" },
  { value: 12, label: "Années d'expérience", suffix: "+" },
  { value: 24, label: "Support réactif", suffix: "h" },
] as const;

export function StatsSection() {
  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Stats
          stats={STATS.map((s) => ({
            label: s.label,
            value: <AnimatedCounter value={s.value} suffix={s.suffix ?? ""} />,
          }))}
        />
      </div>
    </section>
  );
}
