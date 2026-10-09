"use client";

import { ArrowUp, ArrowUpRight, Download, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SocialIcons } from "@/components/ui/social-icons";
import { profile } from "@/data/profile";
import { NAV_ITEMS } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#101010]">
      <Container className="py-20 sm:py-24">
        <div className="grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent-cyan">
              <span aria-hidden="true" className="h-px w-8 bg-accent-cyan" /> Have Something In Mind?
            </p>
            <h2 className="mt-6 max-w-[680px] font-heading text-[clamp(2.3rem,5.6vw,5rem)] font-extrabold leading-[1.12] tracking-[-0.06em] text-text-primary">
              Let&apos;s build something <span className="text-accent-cyan">worthwhile.</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-[1.9] text-text-secondary sm:text-[15px]">
              Open to thoughtful engineering conversations, meaningful collaborations, and software opportunities.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <MagneticButton href="mailto:siambashar@gmail.com" variant="primary" size="lg">
              Email Me <ArrowUpRight size={17} aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href={profile.cvUrl} external variant="secondary" size="lg">
              Resume <Download size={16} aria-hidden="true" />
            </MagneticButton>
          </div>
        </div>

        <div className="grid gap-12 border-b border-white/10 py-14 sm:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="font-heading text-xl font-extrabold tracking-[-0.05em] text-text-primary">
              SIAM<span className="text-accent-cyan">.</span>
            </p>
            <p className="mt-4 max-w-sm text-[13px] leading-[1.9] text-text-secondary">
              CSE undergraduate at KUET, interested in creating reliable software, learning deeply, and building useful systems.
            </p>
            <div className="mt-6"><SocialIcons /></div>
          </div>

          <div>
            <h3 className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent-cyan">Explore</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className="text-[13px] text-text-secondary transition-colors hover:text-accent-cyan">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent-cyan">Contact</h3>
            <div className="mt-5 space-y-3">
              <a href="mailto:siambashar@gmail.com" className="inline-flex items-center gap-2 break-all text-[13px] text-text-secondary transition-colors hover:text-accent-cyan">
                <Mail size={14} aria-hidden="true" /> siambashar@gmail.com
              </a>
              <p className="text-[13px] text-text-secondary">Khulna, Bangladesh</p>
              <p className="text-[13px] text-text-secondary">Software Engineering</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-secondary">
            © {new Date().getFullYear()} MD Shamiul Bashar Siam. All rights reserved.
          </p>
          <div className="flex items-center justify-between gap-5 sm:justify-end">
            <span className="font-mono text-[10px] uppercase tracking-[0.09em] text-text-secondary">
              Built with Next.js & TypeScript
            </span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-[5px] border border-white/15 text-accent-cyan transition-colors hover:border-accent-cyan/70"
            >
              <ArrowUp size={17} />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
