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
  src,
  alt,
  initials,
  size = "lg",
  className,
  priority,
}: ProfilePortraitProps) {
  const dimension = size === "lg" ? 380 : 260;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("relative mx-auto", className)}
      style={{
        width: size === "lg" ? "min(76vw, 380px)" : "min(68vw, 260px)",
        aspectRatio: "1 / 1",
      }}
    >
      {/* Glow */}

      <div
        aria-hidden
        className="absolute -inset-14 rounded-full bg-accent-cyan/10 blur-[90px]"
      />

      <div
        aria-hidden
        className="absolute -inset-8 rounded-full bg-accent-purple/10 blur-[70px]"
      />

      {/* Border */}

      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-cyan via-accent-purple to-accent-cyan p-[2px]">

        <div className="glass-surface relative h-full w-full overflow-hidden rounded-full">

          {src ? (
            <>
              <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                sizes={`${dimension}px`}
                className="object-cover transition-transform duration-500 hover:scale-105"
              />

              {/* Reflection */}

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent"
              />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-bg-secondary to-surface">

              <span className="font-heading text-6xl font-bold text-white/80">
                {initials}
              </span>

            </div>
          )}
        </div>
      </div>

      {/* Soft Inner Ring */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-4 rounded-full border border-white/10"
      />
    </motion.div>
  );
}