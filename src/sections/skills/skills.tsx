"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SKILLS, SKILL_CATEGORIES } from "@/data/skills";
import { SectionHeading } from "@/components/ui/section-heading";

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-(--nav-height) border-t border-white/10 bg-[#090909] py-24 sm:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: .8, ease: [0.16,1,.3,1] }}
          className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end"
        >
          <div>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-bold tracking-[.22em] uppercase text-accent-cyan">
              <span aria-hidden="true" className="h-px w-8 bg-accent-cyan" /> EXPERTISE MAP
            </p>
            <h2 className="font-heading text-[clamp(4.25rem,10vw,10.5rem)] leading-[.81] uppercase">
              WHAT I KNOW <span className="text-white/45">&</span><br />
              <span className="text-accent-cyan">BUILD.</span>
            </h2>
          </div>
          <p className="max-w-[340px] pb-1 text-sm leading-[1.9] text-text-secondary md:text-base">
            A growing toolkit spanning programming, development workflows
            and engineering foundations. Real skills, always evolving.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {SKILL_CATEGORIES.map((category, groupIndex) => {
            const items = SKILLS.filter((skill) => skill.category === category);
            if (!items.length) return null;
            return (
              <motion.article
                key={category}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .65, delay: groupIndex * .08 }}
                className="group border border-white/10 bg-[#121212] p-6 transition-colors hover:border-accent-cyan/35 sm:p-9"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-7">
                  <div>
                    <span className="font-mono text-[10px] tracking-[.19em] text-accent-cyan">
                      0{groupIndex + 1} / EXPERTISE
                    </span>
                    <h3 className="mt-3 font-heading text-[clamp(2.5rem,4vw,4rem)] leading-[.9] uppercase text-white">
                      {category}
                    </h3>
                  </div>
                  <span className="rounded-full border border-white/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[.12em] text-text-secondary">
                    {String(items.length).padStart(2,"0")} SKILLS
                  </span>
                </div>
                <div className="mt-4 divide-y divide-white/[.08]">
                  {items.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div key={skill.id} className="flex items-center justify-between gap-4 py-5">
                        <div className="flex min-w-0 items-center gap-4">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent-cyan/25 text-accent-cyan">
                            {Icon ? <Icon size={19} aria-hidden="true" /> : <span className="font-mono text-xs font-bold">{skill.name[0]}</span>}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white sm:text-base">{skill.name}</p>
                            <p className="mt-1 text-[11px] leading-relaxed text-text-secondary">{skill.description}</p>
                          </div>
                        </div>
                        <span aria-hidden="true" className="shrink-0 text-xl font-light text-accent-cyan/60">↗</span>
                      </div>
                    );
                  })}
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap justify-between gap-5 border-t border-white/10 pt-6 text-[11px] font-semibold tracking-[.15em] text-text-secondary uppercase">
          <span><strong className="mr-2 text-accent-cyan">{String(SKILLS.length).padStart(2,"0")}</strong> Tools & Skills</span>
          <span><strong className="mr-2 text-accent-cyan">{String(SKILL_CATEGORIES.length).padStart(2,"0")}</strong> Areas</span>
          <span>ALWAYS EXPANDING <span className="text-accent-cyan">↗</span></span>
        </div>
      </Container>
    </section>
  );
}
