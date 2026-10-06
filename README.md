# Neon Siam — Portfolio of MD. Shamiul Basher Siam

A production-grade, cyberpunk-themed personal portfolio built with Next.js App
Router, TypeScript, and Tailwind CSS. This repository is being built in
phases; **Phases 1–3 (initialization, design system, application shell) are
complete.**

## Tech Stack

| Concern | Library |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Scroll animation | GSAP + ScrollTrigger |
| Micro-interactions | Framer Motion |
| Smooth scroll | Lenis |
| Icons | react-icons |
| UI primitives | Hand-authored shadcn/ui-style components (`class-variance-authority`, `tailwind-merge`, `clsx`) |

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Other scripts

```bash
npm run build         # production build
npm run start          # serve the production build
npm run lint           # ESLint
npm run format          # Prettier (writes)
npm run format:check    # Prettier (check only)
```

## Folder Structure

```
src/
  app/                  # Next.js App Router: layout, page, global styles
  components/
    ui/                 # Design-system primitives (Button, Card, Container)
    layout/             # Navbar, Footer (global chrome)
    loading/             # Intro loading screen
    providers/            # Context/provider composition (smooth scroll, etc.)
  sections/              # Page sections — populated from Phase 5 onward
  animations/             # Shared GSAP setup (plugin registration)
  hooks/                 # Reusable hooks (reduced motion, active section, ...)
  lib/                   # Framework-agnostic utilities (cn, motion tokens)
  types/                 # Shared TypeScript types
  data/                  # Structured content (navigation, and later:
                          # profile, projects, skills, certificates, ...)
public/
  assets/
    profile/ cover/ projects/ gallery/ certificates/ icons/
```

Content and UI are intentionally decoupled: sections read from `src/data/*`,
never hardcode copy. Adding a project, certificate, or skill later means
editing one data file — no component changes required.

## Design System

All design tokens live in `src/app/globals.css` under `:root` and are
re-exposed as Tailwind utilities via `@theme inline` (Tailwind v4's CSS-first
config — there is no `tailwind.config.js` in this project by design).

- **Color** — `bg-primary`, `bg-secondary`, `surface`, `accent-cyan`,
  `accent-purple`, `highlight`, `danger`, `success`, `text-primary`,
  `text-secondary`, `border` (e.g. `bg-bg-primary`, `text-accent-cyan`).
- **Typography** — `font-heading` (Space Grotesk), `font-sans` (Inter, body
  default), `font-mono` (JetBrains Mono).
- **Radius** — `rounded-sm` → `rounded-xl`, `rounded-full`.
- **Shadow / glow** — `shadow-elevation-1/2/3`, `shadow-glass`, plus raw
  `var(--glow-cyan)` / `var(--glow-purple)` for bespoke glow effects.
- **Motion** — CSS timing lives in `globals.css` (`--duration-*`,
  `--ease-*`); the *numeric* JS-side mirror used by GSAP/Framer Motion is in
  `src/lib/motion.ts` (`DURATION`, `EASE`, `fadeInUp`, `staggerContainer`,
  etc.) — keep both in sync if the system changes.

### Note on shadcn/ui

The sandbox this scaffold was built in cannot reach `ui.shadcn.com` (the
shadcn CLI registry), so `Button`, `Card`, and `Container` were hand-authored
to match shadcn's conventions exactly (`components.json` is configured
correctly). In an environment with normal internet access you can run
`npx shadcn@latest add <component>` going forward and it will drop new
components into `src/components/ui/` alongside these.

## Application Shell (Phase 3)

- **Root layout** (`src/app/layout.tsx`) — loads the three fonts, sets
  metadata/Open Graph/Twitter tags, composes providers + navbar + footer.
- **Navbar** (`src/components/layout/navbar.tsx`) — transparent at the top,
  glass on scroll, active-section underline (via `useActiveSection`), and a
  fullscreen animated mobile overlay.
- **Footer** — placeholder only; full footer arrives in Phase 14.
- **Loading screen** — GSAP-driven intro, hard-capped at 2.5s, skipped
  entirely when `prefers-reduced-motion` is set.
- **Smooth scroll** — Lenis is initialized in `SmoothScrollProvider` and
  ticked through GSAP so `ScrollTrigger` (used by later section reveals)
  stays in sync. Also skipped under reduced motion.
- **Home page** (`src/app/page.tsx`) — currently renders labeled placeholder
  sections (`#home`, `#about`, `#education`, ... `#contact`) purely so the
  navbar, scroll-spy, and smooth scroll are testable end-to-end before real
  section UI exists. Each stub is replaced by a real section in its phase.

## What's Completed (Phases 1–6)

**Phases 1–3 — Init, design system, shell**
- [x] Next.js App Router + TypeScript project, builds and lints cleanly.
- [x] Tailwind v4 configured with the full cyberpunk design-token system.
- [x] GSAP, Framer Motion, Lenis, react-icons installed and wired centrally.
- [x] shadcn/ui conventions in place (`components.json`, `cn()`, CVA-based
      primitives).
- [x] ESLint + Prettier (with `prettier-plugin-tailwindcss`) configured.
- [x] Scalable, documented folder structure ready for content-driven
      sections.
- [x] Global application shell: layout, navbar (desktop + mobile), loading
      screen, footer placeholder, smooth scroll + GSAP wiring, reduced-motion
      handling throughout.
- [x] `NEXT_PUBLIC_SITE_URL` environment variable (see `.env.example`) with
      a `localhost:3000` dev fallback — no domain hardcoded in source.

**Phase 4 — Navigation**
- [x] `ScrollProgress` — thin neon-cyan top bar tied to scroll position.
- [x] Active-section underline on the desktop navbar (already in the
      Phase 3 shell) verified against real sections.

**Phase 5 — Hero** (`src/sections/hero/`)
- [x] Cinematic animated background: slow cyberpunk grid drift, layered
      cyan/purple blooms with subtle mouse parallax (desktop, reduced-motion
      aware), vignette for text legibility — all transform/opacity only.
- [x] `coverImageSrc` blend layer wired in and inert until a cover photo is
      set (blurred, dimmed, gradient-masked — never a hard stretch-fill).
- [x] `NameReveal` — staggered per-letter mask reveal (no typing effect),
      with an `aria-label` fallback and a static heading when
      `prefers-reduced-motion` is set.
- [x] `RotatingTitles` — smooth crossfade between the three role titles.
- [x] `ProfilePortrait` — glass-framed circular portrait with a slow
      rotating gradient ring and soft float; shows initials on a scanline
      placeholder until `profile.profileImageSrc` is set, no code changes
      needed when it is.
- [x] `MagneticButton` — magnetic cursor pull, ripple-on-click, glow, and
      full hover/active/focus states for Download CV / View Projects /
      Contact Me.
- [x] `SocialIcons` — GitHub, LinkedIn, Codeforces, Email, WhatsApp,
      Facebook, Instagram with glow/lift/scale/rotate hover and tooltips.
- [x] Scroll indicator, fully responsive (portrait-first stack on mobile).

**Phase 6 — About** (`src/sections/about/`)
- [x] Split layout: portrait + hobbies on one side, story-driven bio +
      quick facts on the other, reveals staggered via GSAP ScrollTrigger.
- [x] `QuickFacts` — animated glass cards (name, nationality, degree,
      department, university, career goal, locations).
- [x] Personality-forward copy (curiosity, discipline, growth) instead of a
      flat paragraph dump, per the spec's "About" §.

All owner content (name, titles, bio, quick facts, hobbies, CV link, social
URLs) lives in `src/data/profile.ts` and `src/data/social.ts` — every "#"
placeholder and `null` image field is called out with a `TODO` comment for
exactly what to replace and where.

## What's Next

- **Phase 11 — Projects** — the flagship section: featured project
  case-study layout, filterable/searchable grid, modal gallery.
- Phases 12+ continue per the original specification (Gallery, Contact,
  Footer, global Animations pass, Optimization, Testing, Deployment prep).

This project stops here awaiting approval before Phase 11 begins.

---

## Phase 7 — Education (`src/sections/education/`)

- Vertical timeline (center line on desktop, left-aligned on mobile),
  alternating left/right cards on large screens.
- Entries: **KUET** (B.Sc. CSE, current), **Cantonment College, Jashore**
  (HSC), **Kushtia Zilla School** (SSC) — data in `src/data/education.ts`,
  typed via `src/types/education.ts`.
- GSAP ScrollTrigger grows the connecting line as you scroll (`scrub`) and
  reveals each card/node with a staggered, alternating-direction animation;
  the "current" node pulses.
- `ParticleField` (new shared component, `src/components/ui/particle-field.tsx`)
  adds a subtle floating-particle background — deterministic positions (no
  `Math.random()` at render) so there's no SSR/client hydration mismatch,
  reused by Skills and Certificates too.
- Fully responsive; degrades to a static, non-scrubbed layout under
  `prefers-reduced-motion`.

## Phase 8 — Skills (`src/sections/skills/`)

- Grouped by category — **Programming** (C, C++, Verilog), **Tools** (Git,
  GitHub, VS Code), **Microsoft Office** (Word, Excel) — data in
  `src/data/skills.ts`. Add a new skill by adding one object; categories
  with zero skills simply don't render.
- `SkillCard` (`src/components/ui/skill-card.tsx`): mouse-tracked 3D tilt,
  animated conic-gradient border that spins in on hover/focus, icon (brand
  icon where one exists, otherwise a lettered monogram fallback via
  `LetterBadge` — used for C and Verilog, which have no official logo),
  description reveal on hover, and a proficiency bar that animates in once
  when scrolled into view.
- Category groups and cards both stagger in via Framer Motion
  `whileInView`.

## Phase 9 — Certificates (`src/sections/certificates/`)

- Data-driven from `src/data/certificates.ts` — currently an **empty
  array** (no certificates uploaded yet) with a documented example object
  in a comment showing exactly what to paste in later.
- **Google Drive support**: `src/lib/certificates.ts` extracts a file id
  from a Drive share link (`.../file/d/<id>/view`) and derives a working
  thumbnail URL automatically — you can paste a Drive link straight into
  `fileUrl` with no thumbnail hosting needed. `next.config.ts` allowlists
  `drive.google.com/thumbnail` for `next/image`.
- `CertificateCard`: glassmorphism, hover tilt + glow + zoom + animated
  border (same pattern as `SkillCard`); the whole card is a link that opens
  `fileUrl` in a new tab (`target="_blank" rel="noopener noreferrer"`).
  Certificates without a `fileUrl` render as an inert placeholder instead
  of a dead link.
- Category filter buttons are derived from whatever categories actually
  exist in the data — they simply don't appear while the array is empty.
- Empty state: a centered "More certifications coming soon." card instead
  of blank space, per spec.

## Phase 10 — Achievements (`src/sections/achievements/`)

- Data-driven from `src/data/achievements.ts` (milestones: SSC/HSC
  results, Divisional Math & Physics Olympiad selections — typed via
  `src/types/achievement.ts`) plus a separate "Currently Learning" list
  in the same file.
- Milestone timeline: a single left-aligned rail (not alternating like
  Education) so it reads as its own component rather than a reskin —
  GSAP `ScrollTrigger` grows the connecting line on scroll (`scrub`) and
  reveals each card with a left-slide-in; the icon node pops with a
  `back.out` ease. Category (Academic / Competition / Recognition) sets
  the node's accent color.
- "Currently Learning": a separate badge grid below the timeline,
  animated with a distinct Framer Motion scale + slight rotate stagger
  (`whileInView`) instead of the timeline's slide, so the section uses
  two different, purposeful motions rather than repeating one.
- Fully responsive (single column throughout — no desktop-only
  assumptions to unwind on mobile) and degrades to a static layout
  under `prefers-reduced-motion`.
- Add a new milestone or currently-learning item by adding one object
  to `src/data/achievements.ts`; new icons are wired through the
  `ACHIEVEMENT_ICONS` / `LEARNING_ICONS` maps in the section component,
  same pattern as Education's `ICONS` map.

