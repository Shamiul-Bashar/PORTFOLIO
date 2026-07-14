import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class lists safely — later classes win over earlier
 * conflicting ones instead of both being emitted. Used throughout
 * ui/ and sections/ instead of manual string concatenation.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
