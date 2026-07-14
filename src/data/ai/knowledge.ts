import { profile } from "@/data/profile";
import { EDUCATION } from "@/data/education";
import { SKILLS, SKILL_CATEGORIES } from "@/data/skills";
import { SOCIAL_LINKS } from "@/data/social";
import { ACHIEVEMENTS, CURRENTLY_LEARNING } from "@/data/achievements";
import { PROJECTS } from "@/data/projects";

export const AI_KNOWLEDGE = {
  about: {
    fullName: profile.fullName,
    displayName: profile.displayName,
    bio: profile.heroIntro,
    university: EDUCATION.find((e) => e.status === "current")?.institution || "",
    department: EDUCATION.find((e) => e.status === "current")?.field || "",
    location: profile.location.present,
    careerObjective: profile.quickFacts.find((f) => f.label === "Career Goal")?.value || "",
    philosophy: profile.tagline,
  },
  education: EDUCATION,
  skills: {
    categories: SKILL_CATEGORIES,
    list: SKILLS,
  },
  currentLearning: CURRENTLY_LEARNING,
  projects: PROJECTS.map((p: any) => {
    const titleLower = p.title.toLowerCase();
    const titleWords = titleLower.split(" ");
    const techs = p.technologies || [];
    
    return {
      id: p.id || "",
      slug: p.slug || "",
      title: p.title || "",
      overview: p.overview || "",
      technologies: techs,
      features: p.features || [],
      github: p.githubUrl || "",
      report: p.reportUrl || "",
      liveDemo: p.liveDemoUrl || "",
   keywords: [
  p.slug?.toLowerCase() || "",
  titleLower,
  ...titleWords,

  ...(techs || []).map((t: string) => t.toLowerCase()),

  (p.category || "").toLowerCase(),

  ...(p.id ? [p.id.toLowerCase()] : []),

  ...(titleLower.includes("hydro")
    ? [
        "hydrosmart",
        "hydro smart",
        "smart hydro",
        "smart hydro grid",
        "water grid",
        "water management",
      ]
    : []),

  ...(titleLower.includes("fpga")
    ? [
        "fpga",
        "guessing game",
        "number guessing",
        "verilog",
        "basys3",
        "hardware game",
      ]
    : []),
].filter(Boolean)
    };
  }),
  achievements: ACHIEVEMENTS,
  contact: {
    email: SOCIAL_LINKS.find((s) => s.id === "email")?.url.replace("mailto:", "") || "",
  },
  socialLinks: SOCIAL_LINKS,
  resume: {
    url: profile.cvUrl,
  },
};