"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, PROJECT_CATEGORIES, type Project, type ProjectCategory } from "@/config/projects";
import { ProjectCard } from "./project-card";
import { Button } from "@/components/ui/button";

const ProjectDetailModal = dynamic(
  () => import("./project-detail-modal").then((m) => ({ default: m.ProjectDetailModal })),
  { ssr: false }
);

const ITEMS_PER_PAGE = 6;

export function ProjectsGallery() {
  const [category, setCategory] = useState<ProjectCategory>("tous");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(
    () =>
      category === "tous"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === category),
    [category]
  );

  const visibleProjects = useMemo(
    () => filteredProjects.slice(0, visibleCount),
    [filteredProjects, visibleCount]
  );


  const hasMore = visibleCount < filteredProjects.length;

  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  }, []);

  const handleCategoryChange = useCallback((newCategory: ProjectCategory) => {
    setCategory(newCategory);
    setVisibleCount(ITEMS_PER_PAGE);
  }, []);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredProjects.length));
  }, [filteredProjects.length]);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    if (!hasMore) return;
    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "100px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return (
    <div className="space-y-8">
      {/* Filtres */}
      <nav
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filtrer les projets par catégorie"
      >
        {PROJECT_CATEGORIES.map((cat) => (
          <Button
            key={cat.value}
            variant={category === cat.value ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange(cat.value)}
            role="tab"
            aria-selected={category === cat.value}
            aria-controls="projects-grid"
            id={`filter-${cat.value}`}
          >
            {cat.label}
          </Button>
        ))}
      </nav>

      {/* Grille */}
      <div
        id="projects-grid"
        role="tabpanel"
        aria-labelledby={`filter-${category}`}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="wait">
          {visibleProjects.length > 0 ? (
            visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onSelect={handleSelectProject}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full py-16 text-center text-muted-foreground"
            >
              Aucun projet dans cette catégorie.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Infinite scroll sentinel + bouton Load more */}
      {hasMore && (
        <div
          ref={loadMoreRef}
          className="flex justify-center pt-4"
        >
          <Button
            variant="outline"
            onClick={loadMore}
            className="min-h-[44px] min-w-[120px]"
            aria-label="Charger plus de projets"
          >
            Charger plus
          </Button>
        </div>
      )}

      {/* Modal détails */}
      <ProjectDetailModal
        project={selectedProject}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
