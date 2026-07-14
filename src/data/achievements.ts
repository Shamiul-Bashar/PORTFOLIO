import type { AchievementEntry, LearningItem } from "@/types/achievement";

/**
 * Milestones only — day-to-day coursework lives in src/data/education.ts.
 * Add a new entry here any time something is won, selected, or
 * completed; the section re-sorts nothing automatically, so keep the
 * array in the chronological order you want displayed.
 *
 * TODO: the two Olympiad entries below use placeholder years. Confirm
 * the exact year, host organization, and any round/placement reached,
 * then update `date` and `description` accordingly.
 */
export const ACHIEVEMENTS: AchievementEntry[] = [
  {
    id: "divisional-physics-olympiad",
    title: "Divisional Physics Olympiad — Selected",
    description:
      "Selected for the Divisional Physics Olympiad after clearing school and district rounds.",
    date: "2020",
    category: "Competition",
  },
  {
    id: "divisional-math-olympiad",
    title: "Divisional Math Olympiad — Selected",
    description:
      "Selected for the Divisional Mathematics Olympiad, representing the school beyond the district level.",
    date: "2021",
    category: "Competition",
  },
  {
    id: "ssc-result",
    title: "SSC — A+",
    description:
      "Completed the Secondary School Certificate at Kushtia Zilla School with the highest grade.",
    date: "2022",
    category: "Academic",
  },
  {
    id: "hsc-result",
    title: "HSC — A+",
    description:
      "Completed the Higher Secondary Certificate at Cantonment College, Jashore with the highest grade.",
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
    label: "Microprocessors & Microcontrollers",
    description: "Studying microprocessor and microcontroller architectures, embedded systems, interfacing techniques, and hardware-based system design..",
  },
];
