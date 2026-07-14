export type EducationStatus = "current" | "completed";

export interface EducationEntry {
  id: string;
  institution: string;
  credential: string;
  field?: string;

  /** Official website of the institution */
  website?: string;

  /** e.g. "A+", "GPA 3.85/4.00" — omitted while in progress. */
  result?: string;

  status: EducationStatus;

  /** e.g. "2024 — Present" */
  period: string;

  location: string;
}