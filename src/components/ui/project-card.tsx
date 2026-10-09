"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowUpRightFromSquare, FaGithub, FaFileLines, FaFolderClosed, FaArrowRight } from "react-icons/fa6";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  project: Project;
  onOpen(project: Project): void;
  className?: string;
}

export function ProjectCard({ project, onOpen, className }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: .6, ease: [0.16,1,.3,1] }}
      className={cn(
        "group flex h-full min-w-0 flex-col overflow-hidden border border-white/15 bg-[#141414] transition-colors duration-300 hover:border-accent-cyan/55",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-[#1b1b1b]">
        {project.coverImage ? (
          <Image src={project.coverImage} alt={project.title} fill sizes="(max-width: 768px) 90vw, 560px" draggable={false}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.045]" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-[linear-gradient(145deg,#1c1c1c,#111111)]">
            <FaFolderClosed size={50} className="text-accent-cyan/50" aria-hidden="true" />
            <span className="font-mono text-[10px] tracking-[.24em] uppercase text-white/40">PROJECT / {project.year}</span>
          </div>
        )}
        <span className="absolute top-5 left-5 rounded-full border border-white/25 bg-black/70 px-4 py-2 text-[10px] font-bold tracking-[.14em] text-white uppercase backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-6 pt-7 pb-6 sm:px-8 sm:pt-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[10px] font-bold tracking-[.18em] uppercase text-accent-cyan">{project.status}</p>
          <span className="font-mono text-[11px] text-white/50">{project.year}</span>
        </div>
        <h3 className="mt-4 font-heading text-[clamp(2rem,4vw,3.5rem)] leading-[.98] uppercase text-white transition-colors group-hover:text-accent-cyan">
          {project.title}
        </h3>
        <p className="mt-4 line-clamp-3 min-h-[58px] text-[13px] leading-[1.75] text-text-secondary sm:text-sm">{project.shortDescription}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.slice(0,5).map((tech) => (
            <span key={tech} className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[.04em] text-white/65">{tech}</span>
          ))}
          {project.technologies.length > 5 && (
            <span className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] text-white/55">+{project.technologies.length-5}</span>
          )}
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5 sm:mt-9">
          <button type="button" onClick={() => onOpen(project)} className="group/action inline-flex items-center gap-3 text-[11px] font-bold tracking-[.14em] uppercase text-accent-cyan transition-colors hover:text-white">
            VIEW CASE STUDY <FaArrowRight className="transition-transform group-hover/action:translate-x-1" size={13} aria-hidden="true" />
          </button>
          <div className="flex items-center gap-4 text-white/60">
            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`GitHub: ${project.title}`} className="hover:text-accent-cyan"><FaGithub size={16} /></a>}
            {project.reportUrl && <a href={project.reportUrl} target="_blank" rel="noopener noreferrer" aria-label={`Report: ${project.title}`} className="hover:text-accent-cyan"><FaFileLines size={16} /></a>}
            {project.liveDemoUrl && <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Live demo: ${project.title}`} className="hover:text-accent-cyan"><FaArrowUpRightFromSquare size={15} /></a>}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
