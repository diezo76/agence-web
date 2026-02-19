"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/config/projects";

interface ProjectCardProps {
  readonly project: Project;
  readonly index: number;
  readonly onSelect: (project: Project) => void;
}

export const ProjectCard = memo(function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className="group cursor-pointer"
      onClick={() => onSelect(project)}
    >
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={index < 3}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <span className="text-sm font-medium text-white">
              Voir le projet →
            </span>
          </div>
        </div>
        <div className="p-4">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {project.category}
          </span>
          <h3 className="mt-1 font-semibold text-lg">{project.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-2 py-0.5 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
});
