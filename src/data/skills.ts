import { SiCplusplus, SiGit, SiGithub } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaFileWord, FaFileExcel } from "react-icons/fa6";

import type { Skill } from "@/types/skill";

// TODO: proficiency values are a starting self-assessment — tune freely,
// and add new entries here as skills grow. Nothing else needs to change;
// the Skills section renders whatever is in this array, grouped by category.
export const SKILLS: Skill[] = [
  // Programming — C and Verilog have no official brand icon, so they
  // render through the lettered-badge fallback in <SkillCard>.
  {
    id: "c",
    name: "C",
    category: "Programming",
    proficiency: 75,
    description: "Procedural programming, memory management, systems thinking.",
  },
  {
    id: "cpp",
    name: "C++",
    category: "Programming",
    icon: SiCplusplus,
    proficiency: 80,
    description: "OOP, data structures & algorithms, competitive programming.",
  },
  {
    id: "verilog",
    name: "Verilog HDL",
    category: "Programming",
    proficiency: 60,
    description: "Hardware description language for digital logic design.",
  },

  // Tools
  {
    id: "git",
    name: "Git",
    category: "Tools",
    icon: SiGit,
    proficiency: 70,
    description: "Version control, branching workflows, collaborative development.",
  },
  {
    id: "github",
    name: "GitHub",
    category: "Tools",
    icon: SiGithub,
    proficiency: 75,
    description: "Repository management, issues, and project collaboration.",
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "Tools",
    icon: VscVscode,
    proficiency: 85,
    description: "Primary editor — extensions, debugging, integrated terminal.",
  },

  // Microsoft Office
  {
    id: "word",
    name: "Microsoft Word",
    category: "Microsoft Office",
    icon: FaFileWord,
    proficiency: 80,
    description: "Reports, documentation, and formatted academic writing.",
  },
  {
    id: "excel",
    name: "Microsoft Excel",
    category: "Microsoft Office",
    icon: FaFileExcel,
    proficiency: 75,
    description: "Data organization, formulas, and basic analysis.",
  },
];

export const SKILL_CATEGORIES: Skill["category"][] = [
  "Programming",
  "Tools",
  "Microsoft Office",
];
