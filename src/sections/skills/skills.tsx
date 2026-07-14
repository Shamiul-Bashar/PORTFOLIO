"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { ParticleField } from "@/components/ui/particle-field";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillCard } from "@/components/ui/skill-card";
import { SKILLS, SKILL_CATEGORIES } from "@/data/skills";
import { staggerContainer, fadeInUp } from "@/lib/motion";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-(--nav-height) overflow-hidden py-28"
    >
      <div aria-hidden="true" className="bg-bg-primary absolute inset-0 -z-20" />
      <ParticleField />
      <div
        aria-hidden="true"
        className="bg-accent-purple/10 absolute bottom-0 left-[-10%] -z-10 h-96 w-96 rounded-full blur-[130px]"
      />

      <Container>
        <SectionHeading
          eyebrow="What I Work With"
          title="Skills"
          subtitle="Tools and languages I reach for most, from low-level hardware description to everyday productivity."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 flex flex-col gap-16">
          {SKILL_CATEGORIES.map((category) => {
            const skillsInCategory = SKILLS.filter(
              (skill) => skill.category === category,
            );
            if (skillsInCategory.length === 0) return null;

            return (
              <div key={category}>
                <motion.h3
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="text-text-secondary font-mono text-xs tracking-[0.3em] uppercase"
                >
                  {category}
                </motion.h3>

                <motion.div
                  variants={staggerContainer(0.08)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {skillsInCategory.map((skill) => (
                    <motion.div key={skill.id} variants={fadeInUp}>
                      <SkillCard skill={skill} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
