"use client";

import { motion } from "framer-motion";
import {
  FaArrowUp,
  FaEnvelope,
  FaFileArrowDown,
} from "react-icons/fa6";

import { Container } from "@/components/ui/container";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SocialIcons } from "@/components/ui/social-icons";

import { profile } from "@/data/profile";
import {
  fadeInUp,
  staggerContainer,
  EASE,
} from "@/lib/motion";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg-primary">
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
      >
        <div className="absolute left-[-200px] top-0 h-[350px] w-[350px] rounded-full bg-accent-cyan/10 blur-[140px]" />

        <div className="absolute right-[-200px] bottom-0 h-[350px] w-[350px] rounded-full bg-accent-purple/10 blur-[140px]" />
      </div>

      <Container className="py-24">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={fadeInUp}
            className="mx-auto max-w-4xl text-center"
          >
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent-cyan">
              Let's Connect
            </p>

            <h2 className="mt-5 font-heading text-4xl font-bold text-text-primary sm:text-5xl">
              Let's Build Something
              <span className="text-accent-cyan">
                {" "}
                Amazing Together
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
              Whether it's an internship opportunity,
              software project, research collaboration,
              or simply a friendly conversation —
              I'd love to hear from you.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <MagneticButton
                href={profile.cvUrl}
                external
                variant="primary"
                size="lg"
              >
                <FaFileArrowDown />
                Download Resume
              </MagneticButton>

              <MagneticButton
                href="mailto:siambashar@gmail.com"
                variant="secondary"
                size="lg"
              >
                <FaEnvelope />
                Email Me
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="my-20 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"
          />

          <motion.div
            variants={fadeInUp}
            className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]"
          >
            <div>
              <h3 className="font-heading text-2xl font-bold text-text-primary">
                {profile.displayName}
              </h3>

              <p className="mt-5 max-w-md leading-8 text-text-secondary">
                Computer Science & Engineering student at
                Khulna University of Engineering &
                Technology (KUET), passionate about
                building high-quality software and solving
                real-world problems through technology.
              </p>

              <div className="mt-8">
                <SocialIcons />
              </div>
            </div>
                        <div>
              <h4 className="font-heading text-lg font-semibold text-text-primary">
                Quick Links
              </h4>

              <ul className="mt-6 space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-text-secondary transition-all duration-[var(--duration-fast)] hover:translate-x-1 hover:text-accent-cyan"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg font-semibold text-text-primary">
                Contact
              </h4>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
                    Email
                  </p>

                  <a
                    href="mailto:siambashar@gmail.com"
                    className="mt-2 block text-text-secondary transition hover:text-accent-cyan"
                  >
                    siambashar@gmail.com
                  </a>
                </div>

                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
                    Location
                  </p>

                  <p className="mt-2 text-text-secondary">
                    KUET Campus, Khulna
                  </p>
                </div>

                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
                    Career Goal
                  </p>

                  <p className="mt-2 text-text-secondary">
                    Software Engineer
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-20 flex flex-col gap-8 border-t border-border pt-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <p className="text-sm text-text-secondary">
                © {new Date().getFullYear()}{" "}
                <span className="font-medium text-text-primary">
                  MD. Shamiul Basher Siam
                </span>
                . All Rights Reserved.
              </p>

              <p className="mt-2 text-sm text-text-secondary/80">
                Built with{" "}
                <span className="text-accent-cyan">
                  Next.js
                </span>
                {" • "}
                React
                {" • "}
                TypeScript
                {" • "}
                Tailwind CSS
              </p>
            </div>

            <motion.button
              whileHover={{
                y: -5,
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              transition={{
                duration: 0.25,
                ease: EASE.outSoft,
              }}
              onClick={scrollToTop}
              className="glass-surface flex h-14 w-14 items-center justify-center rounded-full border border-accent-cyan/20 text-accent-cyan shadow-[var(--glow-cyan-soft)] transition hover:shadow-[var(--glow-cyan)]"
              aria-label="Back to top"
            >
              <FaArrowUp size={18} />
            </motion.button>
          </motion.div>

        </motion.div>
      </Container>
    </footer>
  );
}