export type AchievementCategory = "Academic" | "Competition" | "Recognition";

export interface AchievementEntry {
  id: string;
  title: string;
  description: string;
  /** e.g. "2019" or "March 2026" */
  date: string;
  category: AchievementCategory;
}

export interface LearningItem {
  id: string;
  label: string;
  description: string;
}
