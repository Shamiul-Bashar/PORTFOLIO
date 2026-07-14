"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { LetterBadge } from "@/components/ui/letter-badge";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { EASE } from "@/lib/motion";
import type { Skill } from "@/types/skill";

interface SkillCardProps {
  skill: Skill;
}

const TILT_RANGE_DEG = 8;

export function SkillCard({ skill }: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(
    useTransform(pointerY, [0, 1], [TILT_RANGE_DEG, -TILT_RANGE_DEG]),
    { stiffness: 220, damping: 20 },
  );
  const rotateY = useSpring(
    useTransform(pointerX, [0, 1], [-TILT_RANGE_DEG, TILT_RANGE_DEG]),
    { stiffness: 220, damping: 20 },
  );

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width);
    pointerY.set((event.clientY - bounds.top) / bounds.height);
  }

  function handleMouseLeave() {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  const Icon = skill.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        prefersReducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 800 }
      }
      whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
      transition={{ duration: 0.3, ease: EASE.outSoft }}
      className="group relative rounded-lg"
    >
      {/* Animated conic-gradient border ring, revealed on hover/focus */}
      <div
        aria-hidden="true"
        className="from-accent-cyan via-accent-purple to-accent-cyan absolute -inset-px rounded-lg bg-gradient-to-br opacity-0 blur-[2px] transition-opacity duration-[var(--duration-base)] group-focus-within:opacity-70 group-hover:opacity-70 motion-safe:group-hover:animate-[spin_6s_linear_infinite]"
      />

      <div className="glass-surface relative flex h-full flex-col gap-4 rounded-lg p-6 shadow-[var(--shadow-glass)] transition-shadow duration-[var(--duration-fast)] group-hover:shadow-[var(--glow-cyan)]">
        <div className="border-border bg-surface flex h-12 w-12 items-center justify-center rounded-md border text-2xl">
          {Icon ? (
            <Icon
              aria-hidden="true"
              className="text-accent-cyan transition-transform duration-[var(--duration-fast)] group-hover:scale-110"
            />
          ) : (
            <LetterBadge
              label={skill.name[0]}
              className="from-accent-cyan to-accent-purple bg-gradient-to-br bg-clip-text text-2xl text-transparent"
            />
          )}
        </div>

        <div>
          <h3 className="font-heading text-text-primary text-base font-semibold">
            {skill.name}
          </h3>
          <p className="text-text-secondary mt-1 text-xs leading-relaxed opacity-0 transition-opacity duration-[var(--duration-fast)] group-focus-within:opacity-100 group-hover:opacity-100">
            {skill.description}
          </p>
        </div>

        <div className="mt-auto">
          <div
            className="bg-surface h-1.5 w-full overflow-hidden rounded-full"
            role="progressbar"
            aria-label={`${skill.name} proficiency`}
            aria-valuenow={skill.proficiency}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.proficiency}%` }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1, ease: EASE.premium, delay: 0.15 }}
              className="from-accent-cyan to-accent-purple h-full rounded-full bg-gradient-to-r"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
