"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { NAV_ITEMS } from "@/data/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const PRIMARY_IDS = new Set(["home", "about", "projects", "skills", "education"]);
const PRIMARY_NAV = NAV_ITEMS.filter((item) => PRIMARY_IDS.has(item.id));
const ALL_IDS = NAV_ITEMS.map((item) => item.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(ALL_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background,border-color] duration-300",
        scrolled || open ? "border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl" : "border-white/5 bg-[#0a0a0a]/90",
      )}
      style={{ height: "var(--nav-height)" }}
    >
      <Container className="relative flex h-full items-center justify-between gap-6">
        <a href="#home" onClick={() => setOpen(false)} className="group inline-flex shrink-0 items-center gap-3" aria-label="Siam Portfolio home">
          <span className="flex h-9 w-9 items-center justify-center rounded-[5px] border border-accent-cyan text-[13px] font-extrabold tracking-[-0.07em] text-accent-cyan">SB</span>
          <span className="font-heading text-[15px] font-extrabold tracking-[-0.05em] text-text-primary">
            SIAM<span className="text-accent-cyan">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 xl:gap-9 lg:flex" aria-label="Primary navigation">
          {PRIMARY_NAV.map((item) => {
            const active = item.id === activeId;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-2 text-xs font-semibold transition-colors duration-200",
                  active ? "text-accent-cyan" : "text-text-secondary hover:text-text-primary",
                )}
              >
                {item.label}
                <span className={cn("absolute right-0 bottom-0 left-0 h-px origin-left bg-accent-cyan transition-transform duration-300", active ? "scale-x-100" : "scale-x-0")} />
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          className="ml-auto hidden h-10 items-center gap-2 rounded-md border border-accent-cyan/55 px-5 text-xs font-bold text-accent-cyan transition-colors hover:border-accent-cyan hover:bg-accent-cyan hover:text-[#0a0a0a] lg:inline-flex lg:ml-0"
        >
          Let&apos;s Talk <ArrowUpRight size={15} aria-hidden="true" />
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="relative z-[60] inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-text-primary lg:hidden"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[var(--nav-height)] z-50 max-h-[calc(100dvh-var(--nav-height))] overflow-y-auto border-b border-white/10 bg-[#101010] px-7 py-7 shadow-2xl lg:hidden"
          >
            <div className="mx-auto max-w-xl divide-y divide-white/10">
              {NAV_ITEMS.map((item, index) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn("flex items-center justify-between py-4 text-[17px] font-semibold transition-colors hover:text-accent-cyan",activeId===item.id?"text-accent-cyan":"text-text-primary")}
                >
                  <span className="flex items-center gap-4"><span className="font-mono text-[10px] text-text-secondary">{String(index+1).padStart(2,"0")}</span>{item.label}</span>
                  <ArrowUpRight size={17} className="text-accent-cyan" />
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
