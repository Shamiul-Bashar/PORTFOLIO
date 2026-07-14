"use client";

import { useEffect, useRef } from "react";
import { FaGraduationCap, FaBuildingColumns, FaSchool } from "react-icons/fa6";
import type { IconType } from "react-icons";

import { Container } from "@/components/ui/container";
import { ParticleField } from "@/components/ui/particle-field";
import { SectionHeading } from "@/components/ui/section-heading";
import { gsap } from "@/animations/gsap";
import { EDUCATION } from "@/data/education";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { GSAP_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ICONS: Record<string, IconType> = {
  kuet: FaGraduationCap,
  "cantonment-college-jashore": FaBuildingColumns,
  "kushtia-zilla-school": FaSchool,
};

export function Education() {
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
              end: "bottom 70%",
              scrub: 0.6,
            },
          },
        );
      }

      const items = itemsRef.current
        ? Array.from(itemsRef.current.querySelectorAll("[data-timeline-item]"))
        : [];

      items.forEach((item, index) => {
        const fromX = index % 2 === 0 ? -40 : 40;
        gsap.from(item, {
          opacity: 0,
          x: window.innerWidth >= 1024 ? fromX : 24,
          duration: 0.7,
          ease: GSAP_EASE.premium,
          scrollTrigger: { trigger: item, start: "top 82%" },
        });

        const node = item.querySelector("[data-timeline-node]");
        if (node) {
          gsap.from(node, {
            scale: 0,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: { trigger: item, start: "top 82%" },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative scroll-mt-(--nav-height) overflow-hidden py-28"
    >
      <div aria-hidden="true" className="bg-bg-secondary absolute inset-0 -z-20" />
      <ParticleField />
      <div
        aria-hidden="true"
        className="bg-accent-cyan/10 absolute top-1/4 right-[-10%] -z-10 h-96 w-96 rounded-full blur-[130px]"
      />

      <Container>
        <SectionHeading
          eyebrow="Who I Am"
          title="Education"
          align="center"
          className="mx-auto"
        />

        <div ref={itemsRef} className="relative mt-20">
          {/* Center line (desktop) / left line (mobile) */}
          <div className="border-border absolute top-0 bottom-0 left-6 w-px border-l lg:left-1/2 lg:-translate-x-1/2">
            <div
              ref={lineRef}
              className="from-accent-cyan via-highlight to-accent-purple absolute inset-0 w-px bg-gradient-to-b shadow-[var(--glow-cyan-soft)]"
            />
          </div>

          <ol className="flex flex-col gap-14">
            {EDUCATION.map((entry, index) => {
              const Icon = ICONS[entry.id] ?? FaGraduationCap;
              const isEven = index % 2 === 0;

              return (
                <li
                  key={entry.id}
                  data-timeline-item
                  className={cn(
                    "relative pl-16 lg:grid lg:grid-cols-2 lg:gap-12 lg:pl-0",
                    isEven ? "lg:text-right" : "",
                  )}
                >
                  {/* Node */}
                  <span
                    data-timeline-node
                    className={cn(
                      "border-accent-cyan bg-bg-primary absolute top-1 left-6 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-2 shadow-[var(--glow-cyan)]",
                      "lg:left-1/2",
                      entry.status === "current" && "animate-pulse",
                    )}
                  >
                    <Icon className="text-accent-cyan text-base" aria-hidden="true" />
                  </span>

                  {/* Card — placed in the correct column per side on desktop */}
                  <div
                    className={cn(
                      "lg:col-start-1",
                      !isEven && "lg:order-2 lg:col-start-2",
                    )}
                  >
                    <div
                      className={cn(
                        "glass-surface inline-block w-full rounded-lg p-6 text-left shadow-[var(--shadow-glass)] transition-shadow duration-[var(--duration-fast)] hover:shadow-[var(--glow-cyan-soft)]",
                        "lg:max-w-md",
                        isEven ? "lg:ml-auto lg:text-right" : "lg:mr-auto",
                      )}
                    >
                      <div
                        className={cn(
                          "flex flex-wrap items-center gap-2",
                          isEven && "lg:justify-end",
                        )}
                      >
                        <span className="text-accent-cyan font-mono text-xs tracking-[0.2em] uppercase">
                          {entry.period}
                        </span>
                        {entry.status === "current" && (
                          <span className="text-success rounded-full border border-current px-2 py-0.5 text-[10px] tracking-wide uppercase">
                            Current
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading text-text-primary mt-3 text-xl font-semibold">
  {entry.website ? (
    <a
      href={entry.website}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 transition-colors duration-300 hover:text-accent-cyan hover:underline"
    >
      {entry.institution}
      <span
        aria-hidden="true"
        className="text-xs opacity-70 transition-transform duration-300 group-hover:translate-x-0.5"
      >
        ↗
      </span>
    </a>
  ) : (
    entry.institution
  )}
</h3>
                      <p className="text-text-secondary mt-1 text-sm">
                        {entry.credential}
                        {entry.field ? ` — ${entry.field}` : ""}
                      </p>

                      <div
                        className={cn(
                          "text-text-secondary mt-4 flex flex-wrap items-center gap-3 text-xs",
                          isEven && "lg:justify-end",
                        )}
                      >
                        <span>{entry.location}</span>
                        {entry.result && (
                          <span className="border-border rounded-full border px-2 py-0.5 font-mono">
                            Result: {entry.result}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
