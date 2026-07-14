"use client";

import type { ReactNode } from "react";

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

/**
 * Single composition point for every global provider. Future phases
 * (command palette, theme toggle, toast system) add their provider
 * here instead of layout.tsx, keeping the root layout a server
 * component wherever possible.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
