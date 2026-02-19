"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations/variants";

/**
 * Exemple d'utilisation des variants personnalisés avec motion.div
 */
export function VariantsExample() {
  return (
    <motion.div
      variants={staggerContainer(0.1, 0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-4"
    >
      <motion.div
        variants={fadeInUp}
        className="rounded-lg border bg-card p-4"
      >
        Item 1
      </motion.div>
      <motion.div
        variants={fadeInUp}
        className="rounded-lg border bg-card p-4"
      >
        Item 2
      </motion.div>
      <motion.div
        variants={fadeInUp}
        className="rounded-lg border bg-card p-4"
      >
        Item 3
      </motion.div>
    </motion.div>
  );
}
