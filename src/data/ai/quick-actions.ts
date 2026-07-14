import { QuickAction } from "@/types/ai";

/**
 * Quick actions available in the AI assistant panel for instant navigation.
 * Each action string corresponds to the identifier handled by the assistant's
 * executeAction logic in the useAIAssistant hook.
 */
export const QUICK_ACTIONS: QuickAction[] = [
  { id: "about", label: "About", action: "NAV_ABOUT" },
  { id: "projects", label: "Projects", action: "NAV_PROJECTS" },
  { id: "skills", label: "Skills", action: "NAV_SKILLS" },
  { id: "learning", label: "Learning", action: "NAV_LEARNING" },
  { id: "education", label: "Education", action: "NAV_EDUCATION" },
  { id: "achievements", label: "Achievements", action: "NAV_ACHIEVEMENTS" },
  { id: "contact", label: "Contact", action: "NAV_CONTACT" },
  { id: "resume", label: "Resume", action: "DOWNLOAD_RESUME" },
];