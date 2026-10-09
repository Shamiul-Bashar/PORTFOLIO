import {
  SiCplusplus, SiGit, SiGithub, SiTypescript,
  SiJavascript, SiReact, SiNodedotjs, SiHtml5, SiCss3,
  SiNextdotjs, SiCmake,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaFileWord, FaFileExcel } from "react-icons/fa6";
import type { Skill } from "@/types/skill";

// These are technologies documented by the owner's portfolio projects,
// labs and GitHub repositories. No fabricated numeric proficiency scores.
export const SKILLS: Skill[] = [
  { id: "c", name: "C", category: "Programming", description: "Procedural programming, memory handling and problem solving." },
  { id: "cpp", name: "C++", category: "Programming", icon: SiCplusplus, description: "OOP, custom data structures, graph algorithms and console applications." },
  { id: "typescript", name: "TypeScript", category: "Programming", icon: SiTypescript, description: "Typed React interfaces and interactive application development." },
  { id: "javascript", name: "JavaScript", category: "Programming", icon: SiJavascript, description: "Frontend interaction and Node.js fundamentals." },
  { id: "verilog", name: "Verilog HDL", category: "Programming", description: "RTL design, sequential logic and FPGA applications." },
  { id: "assembly", name: "8086 Assembly", category: "Programming", description: "Registers, addressing modes and low-level programming coursework." },

  { id: "react", name: "React", category: "Web Development", icon: SiReact, description: "Interactive interfaces for software and simulation projects." },
  { id: "nextjs", name: "Next.js", category: "Web Development", icon: SiNextdotjs, description: "App Router architecture and this personal portfolio." },
  { id: "html", name: "HTML", category: "Web Development", icon: SiHtml5, description: "Semantic page structure and accessible markup." },
  { id: "css", name: "CSS", category: "Web Development", icon: SiCss3, description: "Responsive layouts, styling and motion fundamentals." },
  { id: "node", name: "Node.js", category: "Web Development", icon: SiNodedotjs, description: "Basic server-side JavaScript and project API integration." },

  { id: "git", name: "Git", category: "Tools", icon: SiGit, description: "Version control, branching and project workflows." },
  { id: "github", name: "GitHub", category: "Tools", icon: SiGithub, description: "Repository collaboration, documentation and CI." },
  { id: "vscode", name: "VS Code", category: "Tools", icon: VscVscode, description: "Primary editor, integrated terminal and debugging." },
  { id: "vivado", name: "Xilinx Vivado", category: "Tools", description: "Verilog simulation and Basys 3 FPGA design workflow." },
  { id: "logisim", name: "Logisim", category: "Tools", description: "Digital logic and 28-bit microprogrammed CPU design." },
  { id: "cmake", name: "CMake", category: "Tools", icon: SiCmake, description: "Building and testing C++ console projects." },

  { id: "word", name: "Microsoft Word", category: "Microsoft Office", icon: FaFileWord, description: "Technical reports, documentation and academic writing." },
  { id: "excel", name: "Microsoft Excel", category: "Microsoft Office", icon: FaFileExcel, description: "Data organization, formulas and basic analysis." },
];

export const SKILL_CATEGORIES: Skill["category"][] = [
  "Programming", "Web Development", "Tools", "Microsoft Office",
];
