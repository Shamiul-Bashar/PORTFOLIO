/**
 * lib/ai/assistant-engine.ts
 *
 * Public entry point for Ask Siam AI. Pipeline:
 *
 *   normalize -> (pending clarification?) -> intent classification
 *   -> knowledge retrieval -> response generation
 *
 * The exported signature (generateAIResponse(message: string)) is
 * unchanged, so the existing hook and UI need no changes.
 */

import { AssistantEngineResponse } from "@/types/ai";
import { normalizeInput, isShortUtterance, matchesAny } from "./nlp-utils";
import { classifyIntent, detectFollowUpIntent } from "./classifier";
import { PERSONAL_SCOPE_WORDS, PROJECT_REPO_SCOPE_WORDS, SocialIntent } from "./intents";
import { findProjectByReference } from "./knowledge";
import { memory } from "./memory";
import * as respond from "./response-generator";

/* ---------------------------------------------------------------------- */
/* Pending clarification (two-step GitHub disambiguation)                 */
/* ---------------------------------------------------------------------- */

function isExplicitPersonalPhrasing(input: string): boolean {
  return matchesAny(input, PERSONAL_SCOPE_WORDS);
}

function resolvePendingClarification(input: string): AssistantEngineResponse | null {
  const pending = memory.pendingClarification;
  if (!pending) return null;

  if (pending.kind === "github-scope") {
    memory.clearPendingClarification();

    if (isExplicitPersonalPhrasing(input)) {
      return respond.buildSocialResponse("github");
    }

    const namedProject = findProjectByReference(input);
    if (namedProject) {
      memory.setActiveProject(namedProject);
      return respond.buildProjectFollowUpResponse(namedProject, "github");
    }

    if (matchesAny(input, PROJECT_REPO_SCOPE_WORDS)) {
      memory.setPendingClarification({ kind: "github-project-pick" });
      return respond.buildGithubProjectPickPrompt();
    }

    // Unclear answer — ask which project instead of dead-ending on a fallback.
    memory.setPendingClarification({ kind: "github-project-pick" });
    return respond.buildGithubProjectPickPrompt();
  }

  // pending.kind === "github-project-pick"
  const namedProject = findProjectByReference(input);
  if (namedProject) {
    memory.clearPendingClarification();
    memory.setActiveProject(namedProject);
    return respond.buildProjectFollowUpResponse(namedProject, "github");
  }

  return respond.buildGithubProjectPickPrompt();
}

/* ---------------------------------------------------------------------- */
/* GitHub disambiguation entry point (profile vs. active/named project)   */
/* ---------------------------------------------------------------------- */

function handleGithubIntent(input: string): AssistantEngineResponse {
  if (isExplicitPersonalPhrasing(input) || matchesAny(input, ["github profile"])) {
    return respond.buildSocialResponse("github");
  }

  const namedProject = findProjectByReference(input);
  if (namedProject) {
    memory.setActiveProject(namedProject);
    return respond.buildProjectFollowUpResponse(namedProject, "github");
  }

  if (memory.activeProject) {
    return respond.buildProjectFollowUpResponse(memory.activeProject, "github");
  }

  memory.setPendingClarification({ kind: "github-scope" });
  return respond.buildGithubScopeClarification();
}

/* ---------------------------------------------------------------------- */
/* Core engine                                                            */
/* ---------------------------------------------------------------------- */

export function generateAIResponse(message: string): AssistantEngineResponse {
  const input = normalizeInput(message);

  if (!input) {
    return { text: "I didn't quite catch that — could you type your question again?" };
  }

  const clarified = resolvePendingClarification(input);
  if (clarified) return clarified;

  // 1. Named-entity check: a specific project mentioned anywhere in the
  //    message always wins, optionally combined with a follow-up keyword
  //    in the same message ("tell me about HydroSmart's tech stack").
  const namedProject = findProjectByReference(input);
  if (namedProject) {
    memory.setActiveProject(namedProject);
    const followUp = detectFollowUpIntent(input);
    return respond.buildProjectResponse(namedProject, followUp);
  }

  // 2. General intent classification.
  const { intent } = classifyIntent(input);
  memory.setLastIntent(intent);

  switch (intent) {
    case "greeting":
      return respond.buildGreetingResponse();
    case "goodbye":
      return respond.buildGoodbyeResponse();
    case "thanks":
      return respond.buildThanksResponse();
    case "small_talk":
      return respond.buildSmallTalkResponse(input);
    case "help":
      return respond.buildHelpResponse(input);

    case "about":
      return respond.buildAboutResponse();
    case "education":
      return respond.buildEducationResponse();
    case "skills":
      return respond.buildSkillsResponse();
    case "current_learning":
      return respond.buildLearningResponse();

    case "projects_list":
      return respond.buildProjectListResponse();

    case "certificates":
      return respond.buildCertificatesResponse();
    case "achievements":
      return respond.buildAchievementResponse();
    case "experience":
      return respond.buildExperienceResponse();
    case "future_goals":
      return respond.buildCareerResponse();
    case "availability":
      return respond.buildAvailabilityResponse();

    case "contact":
      return respond.buildContactResponse();
    case "email":
      return respond.buildEmailResponse();
    case "phone":
      return respond.buildPhoneResponse();
    case "resume":
      return respond.buildResumeResponse();
    case "location":
      return respond.buildLocationResponse();

    case "github":
      return handleGithubIntent(input);

    case "linkedin":
    case "facebook":
    case "messenger":
    case "twitter":
      return respond.buildSocialResponse(intent as SocialIntent);

    case "unknown":
    default:
      break;
  }

  // 3. Bare follow-up keywords ("technologies?", "features?") resolved
  //    against the active project from earlier in the conversation.
  const followUp = detectFollowUpIntent(input);
  if (followUp) {
    if (memory.activeProject) {
      return respond.buildProjectFollowUpResponse(memory.activeProject, followUp);
    }
    if (isShortUtterance(input, 4)) {
      return respond.buildFollowUpAmbiguousResponse(followUp);
    }
  }

  return respond.buildFallbackResponse();
}

/* ---------------------------------------------------------------------- */
/* Optional utilities — additive, safe to ignore, do not change the       */
/* public API surface used by the hook.                                  */
/* ---------------------------------------------------------------------- */

export function resetAssistantMemory(): void {
  memory.reset();
}

export function getActiveProjectTitle(): string | null {
  return memory.activeProject?.title ?? null;
}

// re-export for anything that imports the response type from this module
export type { AssistantEngineResponse } from "@/types/ai";