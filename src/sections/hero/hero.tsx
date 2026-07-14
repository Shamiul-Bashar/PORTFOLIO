"use client";

import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa6";

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
      className="relative flex min-h-screen scroll-mt-(--nav-height) items-center overflow-hidden py-32"
    >
      <HeroBackground />

    <Container className="relative z-10 grid min-h-[88vh] items-center gap-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">

  {/* ===========================
      LEFT CONTENT
  ============================ */}

  <motion.div
    variants={staggerContainer(0.12, 0.15)}
    initial="hidden"
    animate="visible"
    className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
  >

    {/* Small Intro */}

    <motion.div variants={fadeInUp}>
      <span className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 px-5 py-2">

        <span className="h-2 w-2 rounded-full bg-accent-cyan shadow-[0_0_12px_var(--color-accent-cyan)]" />

        <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent-cyan">
          Welcome To My Portfolio
        </span>

      </span>
    </motion.div>

    {/* Name */}

    <motion.div
      variants={fadeInUp}
      className="mt-8"
    >
      <NameReveal text={profile.fullName} />
    </motion.div>

    {/* Rotating Titles */}

    <motion.div
      variants={fadeInUp}
      className="mt-6"
    >
      <RotatingTitles titles={profile.titles} />
    </motion.div>

    {/* Hero Intro */}

    <motion.p
      variants={fadeInUp}
      className="text-text-secondary mt-8 max-w-2xl text-lg leading-8 lg:text-xl"
    >
      {profile.heroIntro}
    </motion.p>

    {/* CTA */}

    <motion.div
      variants={fadeInUp}
      className="mt-12 flex flex-wrap items-center justify-center gap-5 lg:justify-start"
    >

      <MagneticButton
        href={profile.cvUrl}
        external
        variant="primary"
        size="lg"
        className="shadow-[var(--glow-cyan)]"
      >
        <FaDownload
          className="text-lg"
          aria-hidden="true"
        />
        Download Resume
      </MagneticButton>

      <MagneticButton
        href="#projects"
        variant="secondary"
        size="lg"
      >
        View Projects
      </MagneticButton>

      <MagneticButton
        href="#contact"
        variant="ghost"
        size="lg"
      >
        Contact Me
      </MagneticButton>

    </motion.div>

    {/* Social */}

    <motion.div
      variants={fadeInUp}
      className="mt-12"
    >
      <SocialIcons />
    </motion.div>

  </motion.div>

  {/* ===========================
      RIGHT CONTENT
  ============================ */}

       {/* ===========================
    RIGHT CONTENT
=========================== */}

<motion.div
  initial={{
    opacity: 0,
    x: 80,
    scale: 0.9,
  }}
  animate={{
    opacity: 1,
    x: 0,
    scale: 1,
  }}
  transition={{
    duration: 1.1,
    ease: [0.16, 1, 0.3, 1],
    delay: 0.35,
  }}
  className="relative order-1 flex items-center justify-center lg:order-2"
>

  {/* Ambient Glow */}

  <div
    aria-hidden
    className="absolute h-[520px] w-[520px] rounded-full bg-accent-cyan/10 blur-[120px]"
  />

  <div
    aria-hidden
    className="absolute h-[420px] w-[420px] rounded-full bg-accent-purple/10 blur-[100px]"
  />

  {/* Portrait */}

  <motion.div
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <ProfilePortrait
      src={profile.profileImageSrc}
      alt={profile.fullName}
      initials={initials}
      size="lg"
      priority
    />
  </motion.div>

</motion.div>

</Container>

{/* Scroll Indicator */}

<motion.div
  initial={{
    opacity: 0,
  }}
  animate={{
    opacity: 1,
  }}
  transition={{
    delay: 1.5,
    duration: 1,
  }}
>
  <ScrollIndicator />
</motion.div>
      <ScrollIndicator />
    </section>
  );
}
