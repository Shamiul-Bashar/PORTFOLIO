export type ProjectCategory = "Hardware" | "Software" | "Embedded Systems" | "IoT";

export type ProjectStatus = "Completed" | "In Progress" | "Concept";
export interface ProjectGalleryItem {
  image: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  /** URL/anchor-safe identifier, used for deep-linking the modal. */
  slug: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  /** e.g. "2026" or "March 2026" */
  year: string;
  /** e.g. "3 weeks". Omitted from the modal meta row when not set. */
  duration?: string;
  /** e.g. "Solo Developer". Omitted from the modal meta row when not set. */
  role?: string;
  /** 1–2 sentence summary shown on the card. */
  shortDescription: string;
  /** Longer case-study intro paragraph, modal-only. */
  overview: string;
  /** What problem the project solves — optional narrative hook for the modal. */
  problemStatement?: string;
  technologies: string[];
  features: string[];
  challenges?: string[];
  lessonsLearned?: string[];
  /** Required for the GitHub button to render — omit while unpublished. */
  githubUrl: string | null;
  /** Required for the Live Demo button to render — omit while unavailable. */
  liveDemoUrl: string | null;
  /** Required for the Report button to render — a direct file path or a Google Drive share link. */
  reportUrl?: string | null;
  /** public/assets/projects/<slug>/cover.webp — falls back to a themed placeholder until set. */
  coverImage: string | null;
  /** public/assets/projects/<slug>/gallery-01.webp, etc. Empty array hides the gallery entirely. */
  gallery: ProjectGalleryItem[];
  /** Marks a project for the larger flagship case-study layout. */
  featured: boolean;
}