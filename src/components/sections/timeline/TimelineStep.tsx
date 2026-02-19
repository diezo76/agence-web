"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export interface TimelineStepData {
  readonly id: string;
  readonly number: number;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

interface TimelineStepProps {
  step: TimelineStepData;
  index: number;
  isLeft: boolean;
}

export function TimelineStep({ step, index, isLeft }: TimelineStepProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative w-full"
    >
      <motion.div
        whileHover={{ scale: 1.02, rotate: 1 }}
        className="group relative w-full max-w-md"
      >
        {/* Glow on hover */}
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

        {/* Card glassmorphism */}
        <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 group-hover:border-white/20">
          {/* Numéro gradient */}
          <div className="mb-4 text-8xl font-black">
            <span className="bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              {String(step.number).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mb-3 text-2xl font-bold text-white md:text-3xl">
            {step.title}
          </h3>
          <p className="text-gray-400">{step.description}</p>

          {/* Icon */}
          <div className="mt-6 text-4xl">{step.icon}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
