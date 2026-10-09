"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
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
            <span aria-hidden="true" className="h-px w-9 bg-accent-cyan" /> LET&apos;S CONNECT
          </p>
          <h2 className="max-w-[1200px] font-heading text-[clamp(2.8rem,10vw,11rem)] leading-[.82] tracking-[-.015em] text-white uppercase">
            LET&apos;S BUILD<br />
            SOMETHING<br />
            <span className="text-accent-cyan">EXTRAORDINARY.</span>
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
