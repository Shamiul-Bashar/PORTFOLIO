"use client";

import { useEffect, useRef } from "react";

import { Container } from "@/components/ui/container";
import { ProfilePortrait } from "@/components/ui/profile-portrait";
import { SectionHeading } from "@/components/ui/section-heading";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { GSAP_EASE } from "@/lib/motion";

import { QuickFacts } from "./quick-facts";

const initials = profile.displayName
  .split(" ")
  .map((part) => part[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(portraitRef.current, {
        opacity: 0,
        x: -48,
        duration: 0.9,
        ease: GSAP_EASE.premium,
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });

      const paragraphs = paragraphsRef.current
        ? Array.from(paragraphsRef.current.children)
        : [];

      gsap.from(paragraphs, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.15,
        ease: GSAP_EASE.premium,
        scrollTrigger: {
          trigger: paragraphsRef.current,
          start: "top 75%",
        },
      });

      const facts = factsRef.current
        ? Array.from(factsRef.current.querySelectorAll("dl > *"))
        : [];

      gsap.from(facts, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: GSAP_EASE.premium,
        scrollTrigger: {
          trigger: factsRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.refresh());
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative scroll-mt-(--nav-height) overflow-hidden py-28"
    >
      <div
        aria-hidden="true"
        className="bg-bg-secondary absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
      />

      <div
        aria-hidden="true"
        className="hidden"
      />

      <Container className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div
          ref={portraitRef}
          className="flex flex-col items-center gap-6 lg:items-start"
        >
          <ProfilePortrait
            src={profile.aboutImageSrc}
            alt={profile.fullName}
            initials={initials}
            size="md"
          />

          <ul className="flex flex-wrap justify-center gap-2 lg:justify-start">
            {profile.hobbies.map((hobby) => (
              <li
                key={hobby}
                className="border-border text-text-secondary rounded-full border px-3 py-1 font-mono text-xs"
              >
                {hobby}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionHeading eyebrow="Who I Am" title="About Me" />

          <div ref={paragraphsRef} className="mt-8 flex flex-col gap-5">
            {profile.aboutParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-text-secondary leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div ref={factsRef} className="mt-10">
            <QuickFacts facts={profile.quickFacts} />
          </div>
        </div>
      </Container>
    </section>
  );
}