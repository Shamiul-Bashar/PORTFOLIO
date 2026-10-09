"use client";

import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/data/social";
import { cn } from "@/lib/utils";

interface SocialIconsProps { className?: string; iconClassName?: string; }

export function SocialIcons({ className, iconClassName }: SocialIconsProps) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
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
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-[5px] border border-white/15 bg-transparent text-text-secondary transition-colors",
                  "hover:border-accent-cyan/60 hover:text-accent-cyan",
                  iconClassName,
                )}
              >
                <Icon aria-hidden="true" size={17} />
              </motion.a>
              <span role="tooltip" className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-surface px-2 py-1 text-[11px] text-text-primary opacity-0 transition-opacity group-hover:opacity-100">
                {link.name}
              </span>
            </li>
          );
        })}
    </ul>
  );
}
