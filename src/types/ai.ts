/**
 * Core type definitions for the AI Assistant system.
 */

export interface ChatLink {
  label: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  links?: ChatLink[];
}

export interface QuickAction {
  id: string;
  label: string;
  action: string;
}

export interface AssistantEngineResponse {
  text: string;
  links?: ChatLink[];
}