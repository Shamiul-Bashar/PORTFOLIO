/**
 * lib/ai/memory.ts
 *
 * Per-session conversational memory. generateAIResponse(message) can't
 * change signature, so short-term context (the "active" project, a pending
 * disambiguation, fallback-reply rotation) lives in a small module-scoped
 * store, isolated here instead of scattered through the engine.
 */

import { ProjectRecord } from "./knowledge";
import { Intent } from "./intents";

export type PendingClarificationKind = "github-scope" | "github-project-pick";

export interface PendingClarification {
  kind: PendingClarificationKind;
}

interface ConversationState {
  activeProject: ProjectRecord | null;
  lastIntent: Intent | null;
  pendingClarification: PendingClarification | null;
  lastFallbackIndex: number | null;
}

const state: ConversationState = {
  activeProject: null,
  lastIntent: null,
  pendingClarification: null,
  lastFallbackIndex: null,
};

export const memory = {
  get activeProject(): ProjectRecord | null {
    return state.activeProject;
  },
  setActiveProject(project: ProjectRecord): void {
    state.activeProject = project;
  },
  clearActiveProject(): void {
    state.activeProject = null;
  },

  get lastIntent(): Intent | null {
    return state.lastIntent;
  },
  setLastIntent(intent: Intent): void {
    state.lastIntent = intent;
  },

  get pendingClarification(): PendingClarification | null {
    return state.pendingClarification;
  },
  setPendingClarification(pending: PendingClarification | null): void {
    state.pendingClarification = pending;
  },
  clearPendingClarification(): void {
    state.pendingClarification = null;
  },

  get fallbackIndexRef() {
    return {
      get current() {
        return state.lastFallbackIndex;
      },
      set current(value: number | null) {
        state.lastFallbackIndex = value;
      },
    };
  },

  reset(): void {
    state.activeProject = null;
    state.lastIntent = null;
    state.pendingClarification = null;
    state.lastFallbackIndex = null;
  },
};