"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { PROJECTS } from "@/data/projects";
import type { Project } from "@/types/project";
import { ProjectCard } from "@/components/ui/project-card";
import { ProjectModal } from "@/components/ui/project-modal";
import { Container } from "@/components/ui/container";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startX: 0, scrollLeft: 0, active: false, moved: false });

  const close = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, close]);

  const scrollToIndex = (index: number) => {
    const root = trackRef.current;
    if (!root) return;
    const card = root.firstElementChild as HTMLElement | null;
    if (!card) return;
    const gap = parseFloat(getComputedStyle(root).columnGap || "0") || 0;
    root.scrollTo({ left: Math.max(0, Math.min(PROJECTS.length - 1, index)) * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const updatePosition = () => {
    const root = trackRef.current;
    const card = root?.firstElementChild as HTMLElement | null;
    if (!root || !card) return;
    const gap = parseFloat(getComputedStyle(root).columnGap || "0") || 0;
    setActive(Math.min(PROJECTS.length - 1, Math.max(0, Math.round(root.scrollLeft / (card.offsetWidth + gap)))));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !trackRef.current) return;
    if ((e.target as HTMLElement).closest("a,button")) return;
    drag.current = { startX: e.clientX, scrollLeft: trackRef.current.scrollLeft, active: true, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !trackRef.current) return;
    const delta = e.clientX - drag.current.startX;
    if (Math.abs(delta) > 4) drag.current.moved = true;
    trackRef.current.scrollLeft = drag.current.scrollLeft - delta;
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    updatePosition();
  };

  return (
    <section id="projects" className="relative scroll-mt-(--nav-height) overflow-hidden border-t border-white/10 bg-[#0a0a0a] py-24 sm:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8, ease: [0.16,1,.3,1] }}
          className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-bold tracking-[.21em] uppercase text-accent-cyan">
              <span aria-hidden="true" className="h-px w-9 bg-accent-cyan" /> SELECTED WORK
            </p>
            <h2 className="font-heading text-[clamp(4.3rem,10vw,10.5rem)] leading-[.82] uppercase text-white">
              RECENT PROJECTS<br /><span className="text-white/45">&</span> <span className="text-accent-cyan">WORK.</span>
            </h2>
          </div>
          <div className="flex max-w-[310px] flex-col gap-5 lg:pb-2">
            <p className="text-sm leading-[1.9] text-text-secondary">A curated look at real things I&apos;ve built. Drag to explore or use the arrows.</p>
            <span className="text-[10px] font-semibold tracking-[.17em] uppercase text-white/55">{String(PROJECTS.length).padStart(2,"0")} PROJECTS / CONTINUOUSLY BUILDING</span>
          </div>
        </motion.div>
      </Container>

      <div className="mt-14">
        <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
          <div
            ref={trackRef}
            onScroll={updatePosition}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            role="region"
            aria-label="Scrollable project carousel"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") { e.preventDefault(); scrollToIndex(active + 1); }
              if (e.key === "ArrowLeft") { e.preventDefault(); scrollToIndex(active - 1); }
            }}
            className="flex cursor-grab touch-pan-x snap-x snap-mandatory gap-5 overflow-x-auto pb-6 select-none active:cursor-grabbing sm:gap-7 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={(item) => { setSelectedProject(item); setModalOpen(true); }}
                className="w-[min(88vw,550px)] shrink-0 snap-start sm:w-[min(76vw,570px)] lg:w-[min(51vw,620px)]"
              />
            ))}
          </div>
        </div>
      </div>

      <Container>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6">
          <div className="flex items-center gap-4">
            <span aria-live="polite" className="font-mono text-[12px] font-medium tracking-[.1em] text-white">
              {String(active + 1).padStart(2,"0")} <span className="mx-2 text-accent-cyan">/</span> {String(PROJECTS.length).padStart(2,"0")}
            </span>
            <span className="hidden h-px w-24 bg-white/15 sm:block" aria-hidden="true" />
            <span className="hidden text-[10px] font-semibold tracking-[.13em] uppercase text-text-secondary sm:block">Drag to explore</span>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => scrollToIndex(active - 1)} disabled={active === 0} aria-label="Previous project" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent-cyan hover:text-accent-cyan disabled:opacity-30"><FaArrowLeft size={15} /></button>
            <button type="button" onClick={() => scrollToIndex(active + 1)} disabled={active >= PROJECTS.length - 1} aria-label="Next project" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent-cyan hover:text-accent-cyan disabled:opacity-30"><FaArrowRight size={15} /></button>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((old) => !old)}
            aria-expanded={showAll}
            className="inline-flex h-14 items-center gap-4 rounded-full border border-accent-cyan/60 px-8 text-[11px] font-bold tracking-[.15em] uppercase text-accent-cyan transition-colors hover:bg-accent-cyan hover:text-black"
          >
            {showAll ? "HIDE PROJECT GRID" : "VIEW ALL PROJECTS"} <FaArrowUpRightFromSquare size={13} aria-hidden="true" />
          </button>
        </div>

        {showAll && (
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {PROJECTS.map((project) => (
              <ProjectCard
                key={`all-${project.id}`}
                project={project}
                onOpen={(item) => { setSelectedProject(item); setModalOpen(true); }}
              />
            ))}
          </motion.div>
        )}
      </Container>

      <ProjectModal project={selectedProject} open={modalOpen} onClose={close} />
    </section>
  );
}
