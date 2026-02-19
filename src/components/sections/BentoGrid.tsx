"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { PROJECTS } from "@/config/projects";

/** Projet pour la grille Bento */
export interface BentoProject {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly image: string;
  readonly color: string;
  readonly size: string;
  readonly href: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  sites: "Sites Web",
  applications: "Applications",
  ecommerce: "E-commerce",
  branding: "Branding",
};

const BENTO_PROJECTS: readonly BentoProject[] = [
  {
    id: PROJECTS[0].id,
    title: PROJECTS[0].title,
    category: PROJECTS[0].category,
    image: PROJECTS[0].image,
    color: "from-purple-500 to-pink-500",
    size: "lg:col-span-2 lg:row-span-2",
    href: `/projets#project-${PROJECTS[0].id}`,
  },
  {
    id: PROJECTS[1].id,
    title: PROJECTS[1].title,
    category: PROJECTS[1].category,
    image: PROJECTS[1].image,
    color: "from-blue-500 to-cyan-500",
    size: "lg:col-span-1 lg:row-span-1",
    href: `/projets#project-${PROJECTS[1].id}`,
  },
  {
    id: PROJECTS[2].id,
    title: PROJECTS[2].title,
    category: PROJECTS[2].category,
    image: PROJECTS[2].image,
    color: "from-green-500 to-emerald-500",
    size: "lg:col-span-1 lg:row-span-2",
    href: `/projets#project-${PROJECTS[2].id}`,
  },
  {
    id: PROJECTS[3].id,
    title: PROJECTS[3].title,
    category: PROJECTS[3].category,
    image: PROJECTS[3].image,
    color: "from-orange-500 to-red-500",
    size: "lg:col-span-2 lg:row-span-1",
    href: `/projets#project-${PROJECTS[3].id}`,
  },
];

export default function BentoGrid() {
  return (
    <section className="bg-black px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center text-6xl font-bold text-white"
        >
          Nos Réalisations
        </motion.h2>

        <div
          className="grid auto-rows-[300px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: "1200px" }}
        >
          {BENTO_PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: BentoProject;
  index: number;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const categoryLabel = CATEGORY_LABELS[project.category] ?? project.category;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
      animate={inView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`${project.size} group relative cursor-pointer overflow-hidden rounded-3xl`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Link
        href={project.href}
        className="absolute inset-0 z-20"
        aria-label={`Voir le projet ${project.title}`}
      />

      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Gradient overlay (60% → 80% au hover) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-80`}
      />

      {/* Glassmorphism au hover */}
      <div className="absolute inset-0 rounded-3xl border border-transparent bg-white/5 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:border-white/10 group-hover:opacity-100" />

      {/* Contenu : catégorie + titre en bas */}
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          className="relative z-10"
        >
          <p className="mb-2 text-sm font-medium text-white/80">
            {categoryLabel}
          </p>
          <h3 className="text-3xl font-bold text-white">{project.title}</h3>
        </motion.div>

        {/* Icône flèche : x -20→0, opacity 0→1 au hover */}
        <div className="absolute right-8 top-8 z-10 -translate-x-[20px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
