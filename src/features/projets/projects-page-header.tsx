"use client";

import { motion } from "framer-motion";

export function ProjectsPageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 text-center sm:mb-12"
    >
      <h1 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
        Nos Réalisations
      </h1>
      <p className="mx-auto max-w-2xl text-sm text-gray-400 sm:text-base">
        Découvrez une sélection de nos projets web et digitaux.
      </p>
    </motion.div>
  );
}
