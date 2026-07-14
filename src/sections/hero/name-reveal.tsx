"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { EASE } from "@/lib/motion";

interface NameRevealProps {
  text: string;
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035, delayChildren: 0.15 },
  },
};

const letter = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: 0.75, ease: EASE.premium },
  },
};

export function NameReveal({ text }: NameRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <h1 className="font-heading text-text-primary text-4xl font-semibold sm:text-6xl lg:text-7xl">
        {text}
      </h1>
    );
  }

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className="font-heading text-text-primary text-4xl font-semibold sm:text-6xl lg:text-7xl"
      aria-label={text}
    >
      {text.split(" ").map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className="mr-[0.28em] inline-flex overflow-hidden"
        >
          {word.split("").map((char, charIndex) => (
            <span
              key={`${char}-${charIndex}`}
              className="inline-block overflow-hidden"
              aria-hidden="true"
            >
              <motion.span variants={letter} className="inline-block">
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}
