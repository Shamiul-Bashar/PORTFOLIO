"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { MotionLine } from "@/components/ui/motion-line";

const FOCUS = [
  {
    id: "01",
    title: "SOFTWARE & SYSTEMS",
    description: "Building modular applications through structured programming, object-oriented design and practical engineering.",
    tags: ["C++", "OOP", "Software Architecture"],
  },
  {
    id: "02",
    title: "ALGORITHMS & ROUTING",
    description: "Working with graphs, search, shortest paths and resource-allocation problems in simulation projects.",
    tags: ["Graph Algorithms", "DSA", "Dijkstra"],
  },
  {
    id: "03",
    title: "WEB EXPERIENCES",
    description: "Exploring interactive web applications and thoughtful interfaces that communicate complex systems clearly.",
    tags: ["React", "TypeScript", "Interactive UI"],
  },
  {
    id: "04",
    title: "COMPUTER ARCHITECTURE",
    description: "Exploring processors, digital logic and how instruction execution works through simulation and HDL projects.",
    tags: ["Verilog", "Digital Logic", "CPU Design"],
  },
] as const;

export function FocusAreas() {
  return (
    <section className="border-t border-white/10 bg-[#0e0e0e] py-24 sm:py-32" aria-labelledby="focus-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_350px] lg:items-end">
          <div>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-bold tracking-[.19em] uppercase text-accent-cyan">
              <span data-cinematic-rule aria-hidden="true" className="h-px w-8 origin-left bg-accent-cyan" /> AREAS OF FOCUS
            </p>
            <h2 id="focus-heading" className="font-heading text-[clamp(4.1rem,9vw,9.7rem)] leading-[.84] text-white uppercase">
              <MotionLine delay={.08}>WHAT I <span className="text-accent-cyan">BUILD.</span></MotionLine>
            </h2>
          </div>
          <p className="max-w-[350px] text-sm leading-[1.9] text-text-secondary">
            From lower-level logic to user-facing software, these are the disciplines shaping my projects and ongoing learning.
          </p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {FOCUS.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 62, scale: .965 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: .85, delay: index * .095, ease: [.16,1,.3,1] }}
              whileHover={{ y: -9, scale: 1.01 }}
              data-motion-card="" className="group relative flex min-h-[310px] flex-col justify-between overflow-hidden border border-white/10 bg-[#151515] p-7 transition-colors duration-500 hover:border-accent-cyan/50 sm:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[11px] tracking-[.17em] text-accent-cyan">{item.id} / 04</span>
                <span className="text-2xl text-white/25 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-cyan" aria-hidden="true">↗</span>
              </div>
              <div>
                <h3 className="max-w-[420px] font-heading text-[clamp(2.7rem,4.5vw,4.9rem)] leading-[.9] text-white uppercase">{item.title}</h3>
                <p className="mt-5 max-w-md text-[13px] leading-[1.85] text-text-secondary">{item.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => <span key={tag} className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-semibold tracking-[.06em] text-white/55 uppercase">{tag}</span>)}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
