"use client";

import { motion } from "framer-motion";
import { LetterBadge } from "@/components/ui/letter-badge";
import type { Skill } from "@/types/skill";

export function SkillCard({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.24 }}
      className="group flex h-full flex-col rounded-[8px] border border-white/10 bg-[#151515] p-6 transition-colors duration-300 hover:border-accent-cyan/40"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-accent-cyan/25 bg-accent-cyan/[0.055] text-accent-cyan">
          {Icon ? <Icon size={22} aria-hidden="true" /> : <LetterBadge label={skill.name[0]} className="text-lg font-bold text-accent-cyan" />}
        </span>
        <span className="font-mono text-[10px] tracking-widest text-text-secondary">SKILL</span>
      </div>
      <h3 className="mt-6 font-heading text-base font-bold text-text-primary">{skill.name}</h3>
      <p className="mt-2 min-h-[36px] text-xs leading-[1.7] text-text-secondary">{skill.description}</p>
      <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-label={`${skill.name} proficiency`}
        aria-valuenow={skill.proficiency}
        aria-valuemin={0}
        aria-valuemax={100}>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16,1,0.3,1] }}
          className="h-full origin-left bg-accent-cyan"
          style={{ width: `${skill.proficiency}%` }}
        />
      </div>
    </motion.article>
  );
}
