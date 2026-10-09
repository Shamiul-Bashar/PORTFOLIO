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
      {/* Quiet matte backdrop: no bright bloom layers. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hidden" />

        <div className="hidden" />
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