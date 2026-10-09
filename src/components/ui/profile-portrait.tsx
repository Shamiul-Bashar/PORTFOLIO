"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProfilePortraitProps {
  src: string | null;
  alt: string;
  initials: string;
  size?: "lg" | "md";
  variant?: "round" | "editorial";
  className?: string;
  priority?: boolean;
}

export function ProfilePortrait({
  src, alt, initials, size = "lg", variant = "round", className, priority,
}: ProfilePortraitProps) {
  const isEditorial = variant === "editorial";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative mx-auto shrink-0 overflow-hidden border bg-[#181818]",
        isEditorial
          ? "aspect-[4/4.65] w-full max-w-[420px] rounded-[9px] border-white/10"
          : "aspect-square rounded-full border-white/15",
        className,
      )}
      style={isEditorial ? undefined : {
        width: size === "lg" ? "min(76vw, 380px)" : "min(68vw, 260px)",
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={isEditorial ? "(max-width: 1024px) 88vw, 420px" : "(max-width: 768px) 260px, 380px"}
          className={cn(
            "object-cover object-top transition-transform duration-700",
            isEditorial
              ? "grayscale-[0.22] contrast-[1.06] hover:scale-[1.025]"
              : "hover:scale-[1.035]",
          )}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#202020]">
          <span className="font-heading text-6xl font-extrabold tracking-tight text-accent-cyan">
            {initials}
          </span>
        </div>
      )}
      {isEditorial && (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/55 to-transparent" aria-hidden="true" />
          <span aria-hidden="true" className="absolute right-0 bottom-0 h-[3px] w-20 bg-accent-cyan" />
        </>
      )}
    </motion.div>
  );
}
