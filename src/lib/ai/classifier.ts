/**
 * lib/ai/classifier.ts
 *
 * Turns normalized user input into a classified Intent. This replaces the
 * old "first handler that matches wins" pipeline with a scoring pass over
 * every intent, so a message that loosely touches two categories ("about
 * projects") resolves to whichever category it more specifically matches,
 * instead of whichever handler happened to run first.
 */

import { scorePhrases } from "./nlp-utils";
import { FOLLOWUP_PATTERNS, INTENT_PATTERNS, Intent, ProjectFollowUp } from "./intents";

export interface ClassificationResult {
  intent: Intent;
  confidence: number;
  /** Runner-up, useful for ambiguous-input handling / debugging. */
  runnerUp?: { intent: Intent; confidence: number };
}

const INTENTS = Object.keys(INTENT_PATTERNS) as Intent[];

export function classifyIntent(input: string): ClassificationResult {
  let best: { intent: Intent; score: number } = { intent: "unknown", score: 0 };
  let second: { intent: Intent; score: number } = { intent: "unknown", score: 0 };

  for (const intent of INTENTS) {
    if (intent === "unknown") continue;
    const score = scorePhrases(input, INTENT_PATTERNS[intent]);
    if (score > best.score) {
      second = best;
      best = { intent, score };
    } else if (score > second.score) {
      second = { intent, score };
    }
  }

  if (best.score === 0) return { intent: "unknown", confidence: 0 };

  return {
    intent: best.intent,
    confidence: best.score,
    runnerUp: second.score > 0 ? { intent: second.intent, confidence: second.score } : undefined,
  };
}

export function detectFollowUpIntent(input: string): ProjectFollowUp | null {
  let best: { key: ProjectFollowUp; score: number } | null = null;
  for (const key of Object.keys(FOLLOWUP_PATTERNS) as ProjectFollowUp[]) {
    const score = scorePhrases(input, FOLLOWUP_PATTERNS[key]);
    if (score > 0 && (!best || score > best.score)) best = { key, score };
  }
  return best?.key ?? null;
}