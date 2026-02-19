"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { scaleIn } from "@/lib/animations/variants";
import { springTransition } from "@/lib/animations/transitions";

interface ScaleInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Animation ne joue qu'une fois (défaut: true) */
  triggerOnce?: boolean;
  /** Pourcentage de visibilité pour déclencher (0.3 = 30% visible) */
  threshold?: number;
}

export function ScaleIn({
  children,
  className,
  delay = 0,
  triggerOnce = true,
  threshold = 0.1,
}: ScaleInProps) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: triggerOnce, margin: "-50px", amount: threshold }}
      transition={{ ...springTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
