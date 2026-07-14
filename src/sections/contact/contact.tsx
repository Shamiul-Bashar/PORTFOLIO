"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

import { ContactInfo } from "./contact-info";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-accent-cyan/10 absolute left-1/4 top-0 h-80 w-80 rounded-full blur-3xl" />

        <div className="bg-accent-purple/10 absolute bottom-0 right-1/4 h-80 w-80 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="CONTACT"
          title="Let's Build Something Together"
          subtitle="Whether you have a project idea, internship opportunity, collaboration, or simply want to say hello, I'd love to hear from you."
          align="center"
          className="mb-16"
        />

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.35fr]">
          <ContactInfo />

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}