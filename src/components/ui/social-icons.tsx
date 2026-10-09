"use client";

import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/data/social";
import { cn } from "@/lib/utils";

interface SocialIconsProps { className?: string; iconClassName?: string; }

export function SocialIcons({ className, iconClassName }: SocialIconsProps) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {[...SOCIAL_LINKS].sort((a,b) => a.displayOrder - b.displayOrder).map((link) => {
        const Icon = link.icon;
        return (
          <li key={link.id} className="group relative">
            <motion.a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.tooltip}
              whileHover={{ y: -2 }}
              transition={{ duration: .2 }}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/65 transition-colors hover:border-accent-cyan hover:text-accent-cyan",
                iconClassName,
              )}
            >
              <Icon size={17} aria-hidden="true" />
            </motion.a>
            <span role="tooltip" className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#171717] px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {link.name}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
