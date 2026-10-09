"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const ROLES = [
  "SYSTEMS & ALGORITHMS",
  "SOFTWARE ENGINEERING",
  "BUILDING DIGITAL EXPERIENCES",
] as const;

export function RoleSwitch() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => {
      setActive((i) => (i + 1) % ROLES.length);
    }, 3300);
    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <div className="flex min-h-6 flex-wrap items-center gap-3" aria-label={`Current focus: ${ROLES[active]}`}>
      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" />
      <div className="relative h-5 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={reduced ? "static" : active}
            aria-hidden="true"
            initial={reduced ? false : { y: "105%", opacity: 0, filter: "blur(3px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={reduced ? undefined : { y: "-105%", opacity: 0, filter: "blur(3px)" }}
            transition={{ duration: .6, ease: [.16,1,.3,1] }}
            className="block whitespace-nowrap text-[10px] font-bold tracking-[.17em] text-white/70 uppercase sm:text-[11px]"
          >
            {ROLES[reduced ? 0 : active]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
