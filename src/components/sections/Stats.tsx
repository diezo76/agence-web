"use client";

import { StaggerContainer } from "@/components/animations";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations/variants";
import { StatCard } from "./StatCard";

interface Stat {
  value: string | number | React.ReactNode;
  label: string;
  suffix?: string;
}

interface StatsProps {
  stats: readonly Stat[];
  className?: string;
}

export function Stats({ stats, className }: StatsProps) {
  return (
    <StaggerContainer className={className}>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeInUp}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>
    </StaggerContainer>
  );
}
