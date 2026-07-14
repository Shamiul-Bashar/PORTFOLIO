"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegClock } from "react-icons/fa6";

import { Container } from "@/components/ui/container";
import { CertificateCard } from "@/components/ui/certificate-card";
import { ParticleField } from "@/components/ui/particle-field";
import { SectionHeading } from "@/components/ui/section-heading";
import { CERTIFICATES } from "@/data/certificates";
import { EASE, staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { CertificateCategory } from "@/types/certificate";

const ALL = "All" as const;

export function Certificates() {
  const categories = useMemo(() => {
    const unique = new Set<CertificateCategory>(CERTIFICATES.map((c) => c.category));
    return [ALL, ...Array.from(unique)];
  }, []);

  const [activeCategory, setActiveCategory] = useState<CertificateCategory | typeof ALL>(
    ALL,
  );

  const filtered = useMemo(
    () =>
      activeCategory === ALL
        ? CERTIFICATES
        : CERTIFICATES.filter((c) => c.category === activeCategory),
    [activeCategory],
  );

  return (
    <section
      id="certificates"
      className="relative scroll-mt-(--nav-height) overflow-hidden py-28"
    >
      <div aria-hidden="true" className="bg-bg-secondary absolute inset-0 -z-20" />
      <ParticleField />
      <div
        aria-hidden="true"
        className="bg-accent-cyan/10 absolute top-0 left-[-10%] -z-10 h-96 w-96 rounded-full blur-[130px]"
      />

      <Container>
        <SectionHeading
          eyebrow="Learning Never Stops"
          title="Certificates"
          align="center"
          className="mx-auto"
        />

        {categories.length > 1 && (
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={cn(
                  "rounded-full border px-4 py-1.5 font-mono text-xs tracking-wide uppercase transition-colors duration-[var(--duration-fast)]",
                  activeCategory === category
                    ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan shadow-[var(--glow-cyan-soft)]"
                    : "border-border text-text-secondary hover:text-text-primary hover:border-accent-cyan/40",
                )}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="mt-14">
          {filtered.length > 0 ? (
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeCategory}
                variants={staggerContainer(0.08)}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((certificate) => (
                  <motion.div key={certificate.id} variants={fadeInUp} layout>
                    <CertificateCard certificate={certificate} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE.premium }}
              className="glass-surface mx-auto flex max-w-md flex-col items-center gap-3 rounded-lg px-8 py-14 text-center shadow-[var(--shadow-glass)]"
            >
              <FaRegClock className="text-accent-cyan text-3xl" aria-hidden="true" />
              <p className="font-heading text-text-primary text-lg font-medium">
                More certifications coming soon.
              </p>
              <p className="text-text-secondary text-sm">
                This section will fill up as new certificates are earned — check back
                later.
              </p>
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
