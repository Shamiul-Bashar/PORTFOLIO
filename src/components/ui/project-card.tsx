"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, FileText, FolderCode, Github, ExternalLink } from "lucide-react";
import type { Project } from "@/types/project";

export interface ProjectCardProps {
  project: Project;
  onOpen(project: Project): void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[10px] border border-white/10 bg-[#151515] transition-colors duration-300 hover:border-accent-cyan/40"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-[#1e1e1e]">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 bg-[#202020]">
            <FolderCode size={37} strokeWidth={1} className="text-accent-cyan/55" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">
              Project / {project.year}
            </span>
          </div>
        )}
        {project.featured && (
          <span className="absolute top-4 left-4 rounded-[3px] border border-accent-cyan/50 bg-[#0a0a0a]/85 px-3 py-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.15em] text-accent-cyan">
            Featured Project
          </span>
        )}
        <span className="absolute right-4 bottom-4 rounded-[3px] bg-[#0a0a0a]/85 px-3 py-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/75">
          {project.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-accent-cyan">{project.category}</span>
          <span className="font-mono text-[10px] tracking-[0.05em] text-text-secondary">{project.year}</span>
        </div>
        <h3 className="mt-4 font-heading text-[19px] font-bold leading-[1.4] tracking-[-0.045em] text-text-primary transition-colors group-hover:text-accent-cyan sm:text-[22px]">
          {project.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-[13px] leading-[1.85] text-text-secondary">
          {project.shortDescription}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="rounded-[4px] border border-white/10 bg-white/[0.025] px-2.5 py-1.5 text-[10px] text-text-secondary">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded-[4px] border border-white/10 px-2.5 py-1.5 text-[10px] text-text-secondary">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto pt-7">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="group/action flex h-11 w-full items-center justify-between rounded-[5px] border border-accent-cyan/45 px-4 text-left text-xs font-bold text-accent-cyan transition-colors hover:border-accent-cyan hover:bg-accent-cyan hover:text-[#0a0a0a]"
          >
            Explore Project Details
            <ArrowUpRight size={17} className="transition-transform group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5" aria-hidden="true" />
          </button>
          {(project.githubUrl || project.reportUrl || project.liveDemoUrl) && (
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-text-secondary transition-colors hover:text-accent-cyan">
                  <Github size={14} aria-hidden="true" /> Source
                </a>
              )}
              {project.reportUrl && (
                <a href={project.reportUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-text-secondary transition-colors hover:text-accent-cyan">
                  <FileText size={14} aria-hidden="true" /> Report
                </a>
              )}
              {project.liveDemoUrl && (
                <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-text-secondary transition-colors hover:text-accent-cyan">
                  <ExternalLink size={14} aria-hidden="true" /> Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
