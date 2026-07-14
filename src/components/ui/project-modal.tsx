"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaFilePdf, FaArrowUpRightFromSquare, FaXmark } from "react-icons/fa6";
import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { ProjectGallery } from "@/components/ui/project-gallery";
import { cn } from "@/lib/utils";

export interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onClose(): void;
}

export function ProjectModal({ project, open, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!project || !open) return null;

  return (
    <AnimatePresence>
      {open && project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl glass-surface border border-border bg-surface shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-5 sm:px-8">
              <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
                {project.title}
              </h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
                aria-label="Close modal"
              >
                <FaXmark className="h-6 w-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8">
              {/* Metadata Grid */}
              <div className="mb-10 grid grid-cols-2 gap-6 md:grid-cols-4">
                <div>
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Status
                  </span>
                  <span
                    className={cn(
                      "inline-block rounded-full border px-2.5 py-1 text-xs font-medium",
                      project.status.toLowerCase() === "completed"
                        ? "border-green-500/30 bg-green-500/10 text-green-400"
                        : project.status.toLowerCase() === "in progress"
                        ? "border-cyan-500/30 bg-cyan-500/10 text-accent-cyan"
                        : "border-border bg-surface text-text-secondary"
                    )}
                  >
                    {project.status}
                  </span>
                </div>
                <div>
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Category
                  </span>
                  <span className="font-medium text-text-primary">
                    {project.category}
                  </span>
                </div>
                <div>
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Year
                  </span>
                  <span className="font-medium text-text-primary">
                    {project.year}
                  </span>
                </div>
                {project.role && (
                  <div>
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                      Role
                    </span>
                    <span className="font-medium text-text-primary">
                      {project.role}
                    </span>
                  </div>
                )}
                {project.duration && (
                  <div>
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                      Duration
                    </span>
                    <span className="font-medium text-text-primary">
                      {project.duration}
                    </span>
                  </div>
                )}
              </div>

              {/* Overview */}
              <div className="mb-10">
                <h3 className="mb-3 text-xl font-bold text-text-primary">
                  Overview
                </h3>
                <p className="whitespace-pre-line leading-relaxed text-text-secondary">
                  {project.overview}
                </p>
              </div>

              {/* Problem Statement */}
              {project.problemStatement && (
                <div className="mb-10">
                  <h3 className="mb-3 text-xl font-bold text-text-primary">
                    Problem Statement
                  </h3>
                  <p className="whitespace-pre-line leading-relaxed text-text-secondary">
                    {project.problemStatement}
                  </p>
                </div>
              )}

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-10">
                  <h3 className="mb-4 text-xl font-bold text-text-primary">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Features & Challenges Grid */}
              <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2">
                {project.features && project.features.length > 0 && (
                  <div>
                    <h3 className="mb-4 text-xl font-bold text-text-primary">
                      Features
                    </h3>
                    <ul className="space-y-2 text-text-secondary">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-cyan" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.challenges && project.challenges.length > 0 && (
                  <div>
                    <h3 className="mb-4 text-xl font-bold text-text-primary">
                      Challenges
                    </h3>
                    <ul className="space-y-2 text-text-secondary">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-cyan" />
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Lessons Learned */}
              {project.lessonsLearned &&
                project.lessonsLearned.length > 0 && (
                  <div className="mb-10">
                    <h3 className="mb-4 text-xl font-bold text-text-primary">
                      Lessons Learned
                    </h3>
                    <ul className="space-y-2 text-text-secondary">
                      {project.lessonsLearned.map(
                        (lesson: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-cyan" />
                            <span>{lesson}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <ProjectGallery gallery={project.gallery} title={project.title} />
                </div>
              )}
            </div>

            {/* Footer / Actions */}
            <div className="flex flex-wrap items-center gap-3 border-t border-border p-5 sm:px-8">
              <Button
                variant="outline"
                onClick={onClose}
                className="mr-auto transition-colors hover:text-text-primary"
              >
                Close
              </Button>

              <div className="flex flex-wrap gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Source Code"
                  >
                    <Button variant="outline">
                      <FaGithub className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </a>
                )}
                {project.reportUrl && (
                  <a
                    href={project.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Project Report"
                  >
                    <Button variant="outline">
                      <FaFilePdf className="mr-2 h-4 w-4" />
                      Report
                    </Button>
                  </a>
                )}
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Live Demo"
                  >
                    <Button variant="outline">
                      <FaArrowUpRightFromSquare className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}