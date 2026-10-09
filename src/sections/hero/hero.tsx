"use client";

import { motion } from "framer-motion";
import { FaArrowDown, FaArrowRight, FaDownload } from "react-icons/fa6";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SocialIcons } from "@/components/ui/social-icons";
import { TechMarquee } from "@/components/ui/tech-marquee";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { NameReveal } from "./name-reveal";
import { HeroBackground } from "./hero-background";

export function Hero() {
  const reduced = useReducedMotion();
  const entrance = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 25 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: .8, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="home" className="relative isolate flex min-h-[100svh] scroll-mt-(--nav-height) flex-col overflow-hidden bg-bg-primary">
      <HeroBackground />

      <div className="relative mx-auto flex w-full max-w-[1680px] flex-1 flex-col justify-between px-5 pt-32 pb-10 sm:px-8 md:pt-36 lg:px-[clamp(3rem,5.5vw,7rem)]">
        <motion.div {...entrance(0.2)} className="flex flex-wrap items-start justify-between gap-7">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-9 bg-accent-cyan" aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-[.21em] uppercase text-accent-cyan sm:text-xs">
              Creative Developer / CSE Undergraduate
            </span>
          </div>
          <div className="hidden flex-col text-right text-[10px] font-semibold leading-[1.8] tracking-[.16em] text-text-secondary uppercase md:flex">
            <span>Khulna University of</span>
            <span>Engineering & Technology</span>
            <span>Bangladesh · 2026</span>
          </div>
        </motion.div>

        <div className="relative mt-20 w-full pb-7 sm:mt-24 md:mt-28">
          <motion.div {...entrance(.35)} className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-8">
            <p className="max-w-[320px] text-[13px] leading-[1.85] text-text-secondary md:text-sm">
              Engineering digital experiences, algorithms and systems with
              clarity, curiosity and purpose.
            </p>
            <p className="hidden text-[11px] font-semibold tracking-[.16em] text-text-secondary uppercase lg:block">
              Portfolio — Selected Work / 2026
            </p>
          </motion.div>

          <NameReveal text={profile.fullName} />

          <motion.div {...entrance(2.8)} className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-8 border-t border-white/15 pt-6 sm:mt-8 sm:pt-8">
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="#projects" variant="primary" size="lg" className="gap-3 uppercase !tracking-[.09em]">
                Explore My Work <FaArrowRight size={14} aria-hidden="true" />
              </MagneticButton>
              <MagneticButton href={profile.cvUrl} external variant="secondary" size="lg" className="gap-3 uppercase !tracking-[.09em]">
                Resume <FaDownload size={14} aria-hidden="true" />
              </MagneticButton>
            </div>
            <div className="flex items-center gap-5">
              <SocialIcons />
              <a href="#skills" aria-label="Scroll to expertise" className="hidden items-center gap-3 text-[10px] font-bold tracking-[.21em] text-text-secondary uppercase transition-colors hover:text-accent-cyan md:inline-flex">
                Scroll to explore
                <FaArrowDown className="text-accent-cyan motion-safe:animate-bounce" size={13} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <TechMarquee />
    </section>
  );
}
