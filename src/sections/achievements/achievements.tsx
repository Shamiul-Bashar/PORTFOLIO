"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaAtom,
  FaSquareRootVariable,
  FaGraduationCap,
  FaAward,
  FaCode,
  FaLaptopCode,
  FaMicrochip,
  FaBrain,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { gsap } from "@/animations/gsap";
import { ACHIEVEMENTS, CURRENTLY_LEARNING } from "@/data/achievements";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { staggerContainer, GSAP_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { AchievementCategory } from "@/types/achievement";

const ACHIEVEMENT_ICONS: Record<string, IconType> = {
  "divisional-physics-olympiad": FaAtom,
  "divisional-math-olympiad": FaSquareRootVariable,
  "ssc-result": FaGraduationCap,
  "hsc-result": FaGraduationCap,
};

const CATEGORY_STYLES: Record<AchievementCategory, string> = {
  Academic: "border-accent-cyan text-accent-cyan shadow-[var(--glow-cyan)]",
  Competition: "border-accent-purple text-accent-purple shadow-[var(--glow-purple)]",
  Recognition: "border-highlight text-highlight shadow-[var(--glow-cyan)]",
};

const LEARNING_ICONS: Record<string, IconType> = {
  dsa: FaBrain,
  nextjs: FaLaptopCode,
  fpga: FaMicrochip,
  "oop-cpp": FaCode,
};

export function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "bottom 75%",
              scrub: 0.6,
            },
          },
        );
      }

      const items = itemsRef.current
        ? Array.from(itemsRef.current.querySelectorAll("[data-achievement-item]"))
        : [];

      items.forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          x: -32,
          duration: 0.6,
          ease: GSAP_EASE.premium,
          scrollTrigger: { trigger: item, start: "top 85%" },
        });

        const node = item.querySelector("[data-achievement-node]");
        if (node) {
          gsap.from(node, {
            scale: 0,
            duration: 0.45,
            ease: "back.out(2)",
            scrollTrigger: { trigger: item, start: "top 85%" },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative scroll-mt-(--nav-height) overflow-hidden py-28"
    >
      <div aria-hidden="true" className="bg-bg-primary absolute inset-0 -z-20" />
      <div
        aria-hidden="true"
        className="hidden"
      />

      <Container>
        <SectionHeading
          eyebrow="Milestones"
          title="Achievements"
          subtitle="Moments that marked real progress — from early academic results to olympiad selections."
          align="center"
          className="mx-auto"
        />

        {/* Milestone timeline — single left-aligned rail, distinct from
            Education's alternating layout so consecutive sections don't
            read as the same component reskinned. */}
        <div ref={itemsRef} className="relative mx-auto mt-20 max-w-2xl">
          <div className="border-border absolute top-0 bottom-0 left-6 w-px border-l">
            <div
              ref={lineRef}
              className="from-accent-purple via-highlight to-accent-cyan absolute inset-0 w-px bg-gradient-to-b shadow-[var(--glow-purple-soft)]"
            />
          </div>

          <ol className="flex flex-col gap-10">
            {ACHIEVEMENTS.map((entry) => {
              const Icon = ACHIEVEMENT_ICONS[entry.id] ?? FaAward;

              return (
                <li key={entry.id} data-achievement-item className="relative pl-16">
                  <span
                    data-achievement-node
                    className={cn(
                      "bg-bg-primary absolute top-1 left-6 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-2",
                      CATEGORY_STYLES[entry.category],
                    )}
                  >
                    <Icon className="text-base" aria-hidden="true" />
                  </span>

                  <div className="glass-surface rounded-lg p-6 shadow-[var(--shadow-glass)] transition-shadow duration-[var(--duration-fast)] hover:shadow-[var(--glow-purple-soft)]">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-accent-cyan font-mono text-xs tracking-[0.2em] uppercase">
                        {entry.date}
                      </span>
                      <span className="border-border text-text-secondary rounded-full border px-2 py-0.5 text-[10px] tracking-wide uppercase">
                        {entry.category}
                      </span>
                    </div>

                    <h3 className="font-heading text-text-primary mt-3 text-xl font-semibold">
                      {entry.title}
                    </h3>
                    <p className="text-text-secondary mt-2 text-sm">
                      {entry.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Currently Learning — separate rhythm from the timeline above:
            a badge grid that pops in with a scale/rotate stagger instead
            of a slide, so the section doesn't repeat one motion twice. */}
        <div className="mt-24">
          <h3 className="font-heading text-text-primary text-center text-2xl font-semibold sm:text-3xl">
            Currently Learning
          </h3>
          <p className="text-text-secondary mx-auto mt-2 max-w-xl text-center text-sm">
            Always something new in progress — this list moves as interests grow.
          </p>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {CURRENTLY_LEARNING.map((item) => {
              const Icon = LEARNING_ICONS[item.id] ?? FaBrain;

              return (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, scale: 0.85, rotate: -3 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="glass-surface flex items-start gap-4 rounded-lg p-5 shadow-[var(--shadow-glass)]"
                >
                  <span className="border-accent-cyan text-accent-cyan flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-[var(--glow-cyan-soft)]">
                    <Icon className="text-base" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-heading text-text-primary font-medium">
                      {item.label}
                    </p>
                    <p className="text-text-secondary mt-1 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
