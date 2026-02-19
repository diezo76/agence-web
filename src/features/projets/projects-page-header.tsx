"use client";

import { motion } from "framer-motion";

export function ProjectsPageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 text-center"
    >
      <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        Nos Réalisations
      </h1>
      <p className="mx-auto max-w-2xl text-muted-foreground">
        Découvrez une sélection de nos projets web et digitaux.
      </p>
    </motion.div>
  );
}
