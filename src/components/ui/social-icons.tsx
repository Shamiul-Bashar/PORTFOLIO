"use client";

import { motion } from "framer-motion";

import { SOCIAL_LINKS } from "@/data/social";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SocialIconsProps {
  className?: string;
  iconClassName?: string;
}

export function SocialIcons({ className, iconClassName }: SocialIconsProps) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {[...SOCIAL_LINKS]
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.id} className="group relative">
              <motion.a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.tooltip}
                whileHover={{ y: -3, scale: 1.08, rotate: -4 }}
                transition={{ duration: 0.25, ease: EASE.outSoft }}
                className={cn(
                  "border-border text-text-secondary flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-[var(--duration-fast)]",
                  "hover:border-accent-cyan/60 hover:text-accent-cyan hover:shadow-[var(--glow-cyan-soft)]",
                  iconClassName,
                )}
              >
                <Icon aria-hidden="true" size={18} />
              </motion.a>
              <span
                role="tooltip"
                className="bg-surface text-text-secondary pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md px-2 py-1 text-xs whitespace-nowrap opacity-0 shadow-[var(--shadow-elevation-2)] transition-opacity duration-[var(--duration-fast)] group-hover:opacity-100"
              >
                {link.name}
              </span>
            </li>
          );
        })}
    </ul>
  );
}
