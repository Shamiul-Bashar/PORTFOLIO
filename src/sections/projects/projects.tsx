"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import type { Project } from "@/types/project";
import { ProjectCard } from "@/components/ui/project-card";
import { ProjectModal } from "@/components/ui/project-modal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = useCallback((project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    if (!modalOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleCloseModal();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [modalOpen, handleCloseModal]);

  return (
    <section id="projects" className="relative scroll-mt-(--nav-height) border-t border-white/[0.055] bg-bg-primary py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected Work"
            title="Projects"
            subtitle="A closer look at the software and systems I've built, from problem-solving tools to engineering projects."
          />
          <span className="shrink-0 self-start border-b border-accent-cyan/55 pb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-accent-cyan md:self-end">
            {String(PROJECTS.length).padStart(2, "0")} Projects
          </span>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={handleOpenModal} />
          ))}
        </motion.div>
      </Container>
      <ProjectModal project={selectedProject} open={modalOpen} onClose={handleCloseModal} />
    </section>
  );
}
