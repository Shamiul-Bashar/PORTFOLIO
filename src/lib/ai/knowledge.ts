/**
 * lib/ai/knowledge.ts
 *
 * The only file that reads AI_KNOWLEDGE directly. Everything downstream
 * (response generator, engine) goes through these typed getters instead of
 * touching the raw object, so a shape change in the underlying data files
 * only needs to be handled in one place.
 *
 * AI_KNOWLEDGE itself is never mutated, renamed, or re-exported.
 */

import { AI_KNOWLEDGE } from "@/data/ai/knowledge";
import { containsPhrase, normalizeInput, tightenSpaces } from "./nlp-utils";

/* ---------------------------------------------------------------------- */
/* Shape (defensive — every project/achievement/social field is optional   */
/* so the assistant degrades gracefully instead of assuming a field exists)*/
/* ---------------------------------------------------------------------- */

export interface SkillItem {
  name: string;
  category: string;
}

export interface ProjectRecord {
  id?: string;
  slug: string;
  title: string;
  overview?: string;
  description?: string;
  summary?: string;
  technologies?: string[];
  features?: string[];
  keywords?: string[];
  github?: string;
  repo?: string;
  report?: string;
  documentation?: string;
  demo?: string;
  liveDemo?: string;
  year?: string | number;
  role?: string;
  status?: string;
  category?: string;
}

export interface AchievementObject {
  title?: string;
  name?: string;
  description?: string;
  url?: string;
  year?: string | number;
  type?: string;
}
export type AchievementEntry = string | AchievementObject;

export interface LearningItemObject {
  label: string;
}
export type LearningEntry = string | LearningItemObject;

export interface SocialLinkEntry {
  id: string;
  label?: string;
  url: string;
}

interface RawKnowledgeBase {
  about: {
    fullName?: string;
    displayName?: string;
    bio?: string;
    university?: string;
    department?: string;
    location?: string;
    careerObjective?: string;
    philosophy?: string;
  };
  education?: unknown[];
  skills: { categories?: unknown; list: SkillItem[] };
  currentLearning: LearningEntry[];
  projects: ProjectRecord[];
  achievements?: AchievementEntry[];
  contact: { email?: string; phone?: string };
  socialLinks: SocialLinkEntry[];
  resume: { url: string };
}

const KB = AI_KNOWLEDGE as unknown as RawKnowledgeBase;

/* ---------------------------------------------------------------------- */
/* About / identity                                                       */
/* ---------------------------------------------------------------------- */

export function getDisplayName(): string {
  return KB.about?.displayName || KB.about?.fullName || "Siam";
}

export function getAbout(): { bio: string; university: string; department: string; location?: string; goal?: string } {
  return {
    bio: KB.about?.bio ?? "I'm a developer building things I care about.",
    university: KB.about?.university ?? "",
    department: KB.about?.department ?? "",
    location: KB.about?.location,
    goal: KB.about?.careerObjective,
  };
}

export function getCareerGoal(): string | undefined {
  return KB.about?.careerObjective;
}

export function getLocation(): string | undefined {
  return KB.about?.location;
}

/* ---------------------------------------------------------------------- */
/* Skills / learning                                                      */
/* ---------------------------------------------------------------------- */

export function getSkillsGroupedByCategory(): Map<string, string[]> {
  const grouped = new Map<string, string[]>();
  for (const skill of KB.skills?.list ?? []) {
    const bucket = grouped.get(skill.category) ?? [];
    bucket.push(skill.name);
    grouped.set(skill.category, bucket);
  }
  return grouped;
}

export function getCurrentLearning(): string[] {
  return (KB.currentLearning ?? []).map((entry) => (typeof entry === "string" ? entry : entry.label));
}

/* ---------------------------------------------------------------------- */
/* Education                                                               */
/* ---------------------------------------------------------------------- */

export function getEducationSummary(): { university: string; department: string } {
  return { university: KB.about?.university ?? "", department: KB.about?.department ?? "" };
}

/* ---------------------------------------------------------------------- */
/* Projects                                                                */
/* ---------------------------------------------------------------------- */

export function getAllProjects(): ProjectRecord[] {
  return KB.projects ?? [];
}

export function getProjectOverview(p: ProjectRecord): string | undefined {
  return p.overview ?? p.summary ?? p.description;
}

export function getProjectGithubUrl(p: ProjectRecord): string | undefined {
  return p.github ?? p.repo;
}

export function getProjectReportUrl(p: ProjectRecord): string | undefined {
  return p.report ?? p.documentation;
}

export function getProjectDemoUrl(p: ProjectRecord): string | undefined {
  return p.demo ?? p.liveDemo;
}

function projectSearchTerms(project: ProjectRecord): string[] {
  const terms = new Set<string>();
  terms.add(project.title);
  terms.add(project.slug.replace(/-/g, " "));
  terms.add(tightenSpaces(normalizeInput(project.title)));
  for (const keyword of project.keywords ?? []) terms.add(keyword);
  return Array.from(terms).map(normalizeInput).filter(Boolean);
}

/** Finds the strongest matching project referenced anywhere in the input, if any. */
export function findProjectByReference(input: string): ProjectRecord | null {
  let best: { project: ProjectRecord; score: number } | null = null;

  for (const project of getAllProjects()) {
    let score = 0;
    for (const term of projectSearchTerms(project)) {
      if (containsPhrase(input, term)) score += term.length;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { project, score };
    }
  }

  return best?.project ?? null;
}

/* ---------------------------------------------------------------------- */
/* Achievements / certificates                                            */
/* ---------------------------------------------------------------------- */

export function getAllAchievements(): AchievementEntry[] {
  return KB.achievements ?? [];
}

export function achievementLabel(entry: AchievementEntry): string {
  return typeof entry === "string" ? entry : entry.title ?? entry.name ?? "an achievement";
}

export function achievementUrl(entry: AchievementEntry): string | undefined {
  return typeof entry === "object" ? entry.url : undefined;
}

/** Best-effort filter for entries that look like certificates rather than awards. */
export function getCertificateLikeAchievements(): AchievementEntry[] {
  const all = getAllAchievements();
  const certs = all.filter((entry) => {
    if (typeof entry === "string") return /certificat|certification/i.test(entry);
    const label = `${entry.title ?? ""} ${entry.type ?? ""}`;
    return /certificat|certification/i.test(label);
  });
  return certs.length > 0 ? certs : all;
}

/* ---------------------------------------------------------------------- */
/* Contact / social                                                       */
/*                                                                          */
/* IMPORTANT: socialLinks is an ARRAY of {id, url}, not a keyed object —   */
/* every lookup goes through findSocialLink() so this is handled exactly  */
/* once instead of silently returning undefined at every call site.       */
/* ---------------------------------------------------------------------- */

export function findSocialLink(platformId: string): SocialLinkEntry | undefined {
  const links = KB.socialLinks ?? [];
  return links.find((link) => link.id?.toLowerCase() === platformId.toLowerCase());
}

export function getEmail(): string | undefined {
  return KB.contact?.email || findSocialLink("email")?.url?.replace("mailto:", "");
}

export function getPhone(): string | undefined {
  return KB.contact?.phone;
}

export function getResumeUrl(): string | undefined {
  return KB.resume?.url;
}