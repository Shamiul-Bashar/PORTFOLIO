"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowUpRightFromSquare, FaBars, FaXmark } from "react-icons/fa6";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "HOME", href: "#home" },
  { label: "EXPERTISE", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "ABOUT", href: "#about" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 45);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = old; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[var(--nav-height)] border-b transition-all duration-500",
        scrolled || open
          ? "border-white/15 bg-[#0b0b0b]/90 shadow-[0_12px_40px_rgba(0,0,0,.3)] backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-full max-w-[1680px] items-center justify-between gap-8 px-5 sm:px-8 lg:px-[clamp(3rem,5.5vw,7rem)]">
        <a href="#home" onClick={() => setOpen(false)} className="relative z-[60] inline-flex shrink-0 items-center gap-3" aria-label="Siam home">
          <span className="font-heading text-[31px] leading-none tracking-[.005em] text-white">SIAM<span className="text-accent-cyan">.</span></span>
          <span className="hidden border-l border-white/20 pl-3 text-[9px] leading-[1.6] font-bold tracking-[.16em] text-white/50 uppercase sm:block">
            Designer of<br />Digital Systems
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="group relative py-3 text-[11px] font-semibold tracking-[.17em] text-white/65 transition-colors hover:text-accent-cyan">
              {link.label}
              <span className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 bg-accent-cyan transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <a href="#contact" className="ml-auto hidden h-11 items-center gap-3 rounded-full bg-accent-cyan px-6 text-[11px] font-bold tracking-[.15em] text-[#080808] uppercase transition-colors hover:bg-[#ffe170] lg:ml-0 lg:inline-flex">
          LET&apos;S TALK <FaArrowUpRightFromSquare size={13} aria-hidden="true" />
        </a>

        <button type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white lg:hidden">
          {open ? <FaXmark size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: .3 }}
            className="fixed inset-0 z-50 flex min-h-[100svh] flex-col justify-center bg-[#080808] px-8 pt-16 lg:hidden"
          >
            {[...LINKS, { label: "EDUCATION", href: "#education" }, { label: "CERTIFICATES", href: "#certificates" }, { label: "ACHIEVEMENTS", href: "#achievements" }, { label: "CONTACT", href: "#contact" }].map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .4, delay: index * .045 }}
                className="border-b border-white/10 py-3 font-heading text-[clamp(2.1rem,8vw,3.5rem)] leading-none text-white transition-colors hover:text-accent-cyan"
              >
                <span className="mr-4 align-top font-body text-[11px] text-accent-cyan">{String(index + 1).padStart(2,"0")}</span>
                {link.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
