"use client";

import { motion } from "framer-motion";
import { FaArrowRight, FaDownload } from "react-icons/fa6";

import { Container } from "@/components/ui/container";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ProfilePortrait } from "@/components/ui/profile-portrait";
import { SocialIcons } from "@/components/ui/social-icons";
import { profile } from "@/data/profile";
import { fadeInUp, staggerContainer } from "@/lib/motion";

import { HeroBackground } from "./hero-background";
import { NameReveal } from "./name-reveal";
import { RotatingTitles } from "./rotating-titles";
import { ScrollIndicator } from "./scroll-indicator";

const initials = profile.displayName
  .split(" ")
  .map((part) => part[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen scroll-mt-(--nav-height) items-center overflow-hidden pt-32 pb-24 lg:pt-28 lg:pb-16"
    >
      <HeroBackground />

      <Container className="relative z-10 grid w-full items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <motion.div
          variants={staggerContainer(0.13, 0.2)}
          initial="hidden"
          animate="visible"
          className="order-1 flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-3 rounded-full border border-accent-cyan/25 bg-accent-cyan/[0.06] px-4 py-2 font-mono text-[10px] font-medium tracking-[0.21em] uppercase text-accent-cyan sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[var(--glow-cyan-soft)] motion-safe:animate-pulse" />
              Portfolio / 2026
            </span>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mt-9 font-mono text-sm tracking-[0.24em] uppercase text-text-secondary sm:text-base"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-3 w-full">
            <NameReveal text={profile.fullName} />
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-6">
            <RotatingTitles titles={profile.titles} />
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mt-7 max-w-[590px] text-sm leading-7 text-text-secondary sm:text-base sm:leading-8"
          >
            {profile.heroIntro}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <MagneticButton
              href="#projects"
              variant="primary"
              size="lg"
              className="shadow-[var(--glow-cyan-soft)]"
            >
              View My Work <FaArrowRight aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href={profile.cvUrl} external variant="secondary" size="lg">
              <FaDownload aria-hidden="true" /> Download Resume
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost" size="lg">
              Contact Me
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8">
            <SocialIcons />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex items-center gap-3 border-t border-accent-cyan/15 pt-5 font-mono text-[10px] tracking-[0.18em] uppercase text-text-secondary"
          >
            <span className="h-px w-7 bg-accent-cyan/70" />
            Built with purpose. Powered by curiosity.
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 48, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.05, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-2 mx-auto flex w-full max-w-[470px] items-center justify-center py-8 lg:py-16"
        >
          <div
            aria-hidden="true"
            className="absolute aspect-square w-[min(92vw,460px)] rounded-full border border-accent-cyan/10"
          />
          <div
            aria-hidden="true"
            className="absolute aspect-square w-[min(82vw,410px)] rounded-full border border-dashed border-accent-cyan/15"
          />
          <div
            aria-hidden="true"
            className="absolute aspect-square w-[min(75vw,380px)] rounded-full bg-accent-cyan/[0.085] blur-[90px]"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <ProfilePortrait
              src={profile.profileImageSrc}
              alt={profile.fullName}
              initials={initials}
              size="lg"
              priority
            />
          </motion.div>
          <div className="absolute right-0 bottom-0 z-20 rounded-xl border border-accent-cyan/25 bg-bg-secondary/95 px-5 py-3 shadow-[var(--shadow-elevation-2)] backdrop-blur-lg sm:right-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent-cyan">
              Current Focus
            </p>
            <p className="mt-1 text-xs font-medium text-text-primary">CSE · KUET</p>
          </div>
        </motion.div>
      </Container>

      <div className="absolute bottom-3 left-1/2 z-10 hidden -translate-x-1/2 lg:block">
        <ScrollIndicator />
      </div>
    </section>
  );
}
