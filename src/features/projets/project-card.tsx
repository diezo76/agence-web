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
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-lg">
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
          <span className="text-xs font-medium uppercase tracking-wider text-purple-300">
            {project.category}
          </span>
          <h3 className="mt-1 font-semibold text-lg text-white">{project.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-400">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-gray-300"
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
