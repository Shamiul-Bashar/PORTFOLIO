import type { IconType } from "react-icons";

export type SkillCategory = "Programming" | "Web Development" | "Tools" | "Microsoft Office";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  icon?: IconType;
  /** Optional owner-confirmed self-assessment. No fabricated percentages. */
  proficiency?: number;
  description: string;
}
