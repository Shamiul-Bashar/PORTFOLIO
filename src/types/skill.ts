import type { IconType } from "react-icons";

export type SkillCategory = "Programming" | "Tools" | "Microsoft Office";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  /** Omitted for languages/tools without an official brand icon (e.g. C, Verilog) — falls back to a lettered badge. */
  icon?: IconType;
  /** 0–100. Self-assessed proficiency, shown as an animated bar. */
  proficiency: number;
  description: string;
}
