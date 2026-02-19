"use client";

import { memo } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Project } from "@/config/projects";

interface ProjectDetailModalProps {
  readonly project: Project | null;
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

export const ProjectDetailModal = memo(function ProjectDetailModal({
  project,
  open,
  onOpenChange,
}: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        aria-labelledby="project-dialog-title"
        aria-describedby="project-dialog-description"
      >
        <DialogHeader>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {project.category}
            </span>
            <span className="rounded-md bg-muted px-2 py-1 text-xs">
              {project.year}
            </span>
            {project.client && (
              <span className="rounded-md bg-muted px-2 py-1 text-xs">
                {project.client}
              </span>
            )}
          </div>
          <DialogTitle id="project-dialog-title" className="text-xl">
            {project.title}
          </DialogTitle>
          <DialogDescription id="project-dialog-description">
            {project.longDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Technologies</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border bg-background px-3 py-1 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              Voir le projet en ligne →
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
});
