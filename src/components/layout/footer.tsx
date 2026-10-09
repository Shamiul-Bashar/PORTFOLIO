"use client";

import { FaArrowUp, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Container } from "@/components/ui/container";
import { MotionLine } from "@/components/ui/motion-line";
import { SocialIcons } from "@/components/ui/social-icons";
import { profile } from "@/data/profile";

const QUICK = [
  ["HOME", "#home"], ["EXPERTISE", "#skills"], ["WORK", "#projects"],
  ["ABOUT", "#about"], ["EDUCATION", "#education"], ["CERTIFICATES", "#certificates"],
  ["ACHIEVEMENTS", "#achievements"], ["CONTACT", "#contact"],
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0e0e0e]">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-[1fr_.65fr] lg:items-start lg:py-20">
          <div>
            <a href="#home" className="inline-block font-heading text-[clamp(6rem,15vw,16rem)] leading-[.78] tracking-[-.018em] text-white">
              <MotionLine><span>SIAM<span className="text-accent-cyan">.</span></span></MotionLine>
            </a>
            <p className="mt-5 text-[11px] font-semibold tracking-[.19em] uppercase text-white/45">
              THINK DEEPLY. BUILD WITH PURPOSE.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="mb-5 text-[10px] font-bold tracking-[.18em] uppercase text-accent-cyan">NAVIGATE</p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                {QUICK.map(([label,href]) => (
                  <a key={href} href={href} className="text-[10px] font-semibold tracking-[.08em] text-white/55 transition-colors hover:text-accent-cyan">{label}</a>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-5 text-[10px] font-bold tracking-[.18em] uppercase text-accent-cyan">CONNECT</p>
              <a href="mailto:siambashar@gmail.com" className="inline-flex items-center gap-2 break-all text-[12px] text-white/70 transition-colors hover:text-accent-cyan">
                siambashar@gmail.com <FaArrowUpRightFromSquare size={12} />
              </a>
              <p className="mt-3 text-[12px] text-white/45">{profile.location.present}</p>
              <div className="mt-5"><SocialIcons /></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 border-t border-white/10 py-7 sm:flex-row sm:items-center">
          <p className="text-[10px] font-semibold tracking-[.09em] uppercase text-text-secondary">
            © {new Date().getFullYear()} MD SHAMIUL BASHAR SIAM. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center justify-between gap-6">
            <span className="text-[10px] tracking-[.1em] uppercase text-white/35">DESIGNED TO EVOLVE</span>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-accent-cyan hover:text-accent-cyan">
              <FaArrowUp size={15} />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
