"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { Container } from "@/components/ui/container";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ProfilePortrait } from "@/components/ui/profile-portrait";
import { SocialIcons } from "@/components/ui/social-icons";
import { profile } from "@/data/profile";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { HeroBackground } from "./hero-background";
import { NameReveal } from "./name-reveal";

const initials = profile.displayName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen scroll-mt-(--nav-height) items-center overflow-hidden bg-bg-primary pt-28 pb-16 md:pt-32 md:pb-24"
    >
      <HeroBackground />

      <Container className="relative z-10 grid w-full items-center gap-16 lg:grid-cols-[minmax(0,1.24fr)_minmax(0,0.76fr)] lg:gap-12">
        <motion.div
          variants={staggerContainer(0.12, 0.15)}
          initial="hidden"
          animate="visible"
          className="relative order-1 min-w-0"
        >
          <motion.div variants={fadeInUp} className="mb-10 flex items-center gap-3">
            <span aria-hidden="true" className="h-[2px] w-10 bg-accent-cyan" />
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.21em] text-accent-cyan sm:text-xs">
              Computer Science & Engineering · KUET
            </p>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mb-3 text-sm font-semibold tracking-[0.015em] text-text-secondary sm:text-base"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.div variants={fadeInUp}>
            <NameReveal text={profile.fullName} />
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8 max-w-[580px]">
            <p className="text-[clamp(1.12rem,2vw,1.45rem)] font-medium leading-[1.6] tracking-[-0.02em] text-text-primary">
              Building thoughtful software and solving problems through engineering.
            </p>
            <p className="mt-3 max-w-[510px] text-sm leading-[1.95] text-text-secondary sm:text-[15px]">
              CSE undergraduate at Khulna University of Engineering & Technology, exploring algorithms, software systems and modern web applications.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton href="#projects" variant="primary" size="lg" className="min-w-[175px]">
              Explore Projects <ArrowUpRight size={17} aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href={profile.cvUrl} external variant="secondary" size="lg">
              Download CV <Download size={16} aria-hidden="true" />
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-9 flex flex-wrap items-center gap-5">
            <SocialIcons />
            <span aria-hidden="true" className="hidden h-5 w-px bg-white/15 sm:block" />
            <a href="#contact" className="group inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary transition-colors hover:text-accent-cyan">
              Get in touch <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={15} aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6">
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-text-secondary">Software Development</span>
            <span className="hidden h-1 w-1 rounded-full bg-accent-cyan sm:block" />
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-text-secondary">Algorithms & Systems</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-2 mx-auto w-full max-w-[430px] lg:justify-self-end"
        >
          <div className="relative pl-4 pt-4 sm:pl-6 sm:pt-6">
            <span className="absolute top-0 left-0 h-[2px] w-[74px] bg-accent-cyan" aria-hidden="true" />
            <span className="absolute top-0 left-0 h-[74px] w-[2px] bg-accent-cyan" aria-hidden="true" />
            <ProfilePortrait
              src={profile.profileImageSrc}
              alt={profile.fullName}
              initials={initials}
              variant="editorial"
              size="lg"
              priority
            />
          </div>
          <div className="mt-4 flex items-center justify-between gap-4 pl-4 sm:pl-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.19em] text-accent-cyan">
                Currently Based In
              </p>
              <p className="mt-1 text-sm font-semibold text-text-primary">Khulna, Bangladesh</p>
            </div>
            <ArrowDownRight className="text-accent-cyan" size={24} strokeWidth={1.6} aria-hidden="true" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
