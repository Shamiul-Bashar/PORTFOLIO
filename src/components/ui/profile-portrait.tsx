"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProfilePortraitProps {
  src: string | null;
  alt: string;
  initials: string;
  size?: "lg" | "md";
  className?: string;
  priority?: boolean;
}

export function ProfilePortrait({
  src, alt, initials, size = "lg", className, priority,
}: ProfilePortraitProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .8, ease: [0.16, 1, .3, 1] }}
      className={cn(
        "group relative mx-auto aspect-[4/5] w-full overflow-hidden border border-white/15 bg-[#191919]",
        size === "lg" ? "max-w-[460px]" : "max-w-[385px]",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={size === "lg" ? "(max-width:768px) 90vw,460px" : "(max-width:768px) 88vw,385px"}
          className="object-cover object-top grayscale-[.18] transition-transform duration-700 group-hover:scale-[1.035]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-heading text-[120px] text-accent-cyan">{initials}</span>
        </div>
      )}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      <span aria-hidden="true" className="absolute bottom-0 left-0 h-[5px] w-24 bg-accent-cyan" />
      <span aria-hidden="true" className="absolute bottom-5 right-5 font-mono text-[10px] tracking-[.2em] text-white uppercase">PORTRAIT / 01</span>
    </motion.div>
  );
}
