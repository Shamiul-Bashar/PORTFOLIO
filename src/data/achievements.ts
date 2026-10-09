import type { AchievementEntry, LearningItem } from "@/types/achievement";

/**
 * Publicly verified milestones only.
 * The original profile also listed selection at the Divisional Physics
 * and Mathematics Olympiads, but those entries contained explicitly
 * placeholder years (2020 and 2021). Re-add them after the owner confirms
 * the years, stage and outcome, instead of publishing guessed dates.
 */
export const ACHIEVEMENTS: AchievementEntry[] = [
  {
    id: "ssc-result",
    title: "SSC — GPA 5.00",
    description: "Completed the Secondary School Certificate at Kushtia Zilla School with the highest grade.",
    date: "2022",
    category: "Academic",
  },
  {
    id: "hsc-result",
    title: "HSC — GPA 5.00",
    description: "Completed the Higher Secondary Certificate at Cantonment College, Jashore with the highest grade.",
    date: "2024",
    category: "Academic",
  },
];

/**
 * What the owner is actively working on right now, independent of the
 * finished Skills list. Add or remove freely — the section renders
 * whatever is in this array.
 */
export const CURRENTLY_LEARNING: LearningItem[] = [
  {
    id: "dsa",
    label: "Data Structures & Algorithms",
    description: "Deepening problem-solving fundamentals for competitive programming.",
  },
  {
    id: "nextjs",
    label: "Next.js & Modern Web Development",
    description: "Building this very portfolio as a hands-on learning project.",
  },
  {
    id: "fpga",
    label: "Digital Logic & FPGA Design",
    description: "Extending Verilog HDL coursework into small hardware projects.",
  },
  {
    id: "Computer Architecture",
    label: "Computer Architecture",
    description: "Studying computer architecture to understand processor design, memory organization, instruction execution, and system performance.",
  },

  {
    id: "AutoCad",
    label: "Automatic Computer-Aided Design",
    description: "Learning AutoCAD to create accurate 2D technical drawings and strengthen engineering design skills.",
  },
  {
    id: "Microprocessors & Microcontrollers",
    label: "Assembly Language Programming",
    description: "Learning low-level programming concepts, x86 Assembly language, CPU registers, memory addressing, stack operations, interrupts, and instruction execution to understand how software interacts directly with computer hardware.",
  },
];
