"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { MotionLine } from "@/components/ui/motion-line";
import { ContactInfo } from "./contact-info";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-(--nav-height) overflow-hidden border-t border-white/10 bg-[#090909] py-24 sm:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8, ease: [0.16,1,.3,1] }}
        >
          <p className="mb-5 flex items-center gap-3 text-[11px] font-bold tracking-[.19em] uppercase text-accent-cyan">
            <span data-cinematic-rule aria-hidden="true" className="h-px w-9 origin-left bg-accent-cyan" /> LET&apos;S CONNECT
          </p>
          <h2 className="max-w-[1200px] font-heading text-[clamp(2.45rem,9.1vw,11rem)] leading-[.82] tracking-[-.015em] text-white uppercase">
            <MotionLine delay={.04}>LET&apos;S BUILD</MotionLine>
            <MotionLine delay={.16}>SOMETHING</MotionLine>
            <MotionLine delay={.28}><span className="text-accent-cyan">EXTRAORDINARY.</span></MotionLine>
          </h2>
          <p className="mt-8 max-w-xl text-sm leading-[1.9] text-text-secondary sm:text-base">
            Have an interesting idea, collaboration, internship opportunity or question?
            I&apos;d love to hear about it.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-7 border-t border-white/10 pt-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <ContactInfo />
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
