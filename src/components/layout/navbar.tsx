"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { NAV_ITEMS } from "@/data/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-[var(--duration-base)]",
        scrolled ? "glass-surface" : "border-b border-transparent bg-transparent",
      )}
      style={{ height: "var(--nav-height)" }}
    >
      <Container className="flex h-full items-center justify-between">
        <a
          href="#home"
          className={cn(
            "font-heading text-text-primary text-lg font-semibold tracking-tight transition-transform",
            scrolled ? "scale-100" : "scale-105",
          )}
        >
          PORT<span className="text-accent-cyan">FOLIO</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group font-heading relative py-2 text-sm tracking-wide transition-colors",
                  isActive
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "bg-accent-cyan absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out-soft)] group-hover:scale-x-100",
                    isActive && "scale-x-100 shadow-[var(--glow-cyan-soft)]",
                  )}
                />
              </a>
            );
          })}
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={cn(
              "bg-text-primary h-px w-6 transition-transform duration-[var(--duration-fast)]",
              mobileOpen && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "bg-text-primary h-px w-6 transition-transform duration-[var(--duration-fast)]",
              mobileOpen && "-translate-y-[3.5px] -rotate-45",
            )}
          />
        </button>
      </Container>

      {/* Mobile fullscreen overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE.outSoft }}
            className="glass-surface fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {NAV_ITEMS.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.4, ease: EASE.premium }}
                className="font-heading text-text-primary hover:text-accent-cyan text-2xl transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
