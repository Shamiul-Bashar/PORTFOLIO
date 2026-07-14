import { AI_KNOWLEDGE } from "@/data/ai/knowledge";

/* ============================================================================
 * PUBLIC CONTRACT
 * ==========================================================================*/

export type AssistantLink = { label: string; url: string };

export type AssistantResponse = {
  text: string;
  links?: AssistantLink[];
};

/* ============================================================================
 * KNOWLEDGE BASE SHAPE
 *
 * AI_KNOWLEDGE itself is never mutated, renamed, or re-exported. This local
 * shape only describes what the engine expects to read from it, with every
 * project/achievement/learning field kept optional so the engine degrades
 * gracefully instead of assuming a field exists.
 * ==========================================================================*/

interface SkillItem {
  name: string;
  category: string;
}

interface LearningItemObject {
  label: string;
}
type LearningEntry = string | LearningItemObject;

interface ProjectRecord {
  title: string;
  slug: string;
  overview?: string;
  description?: string;
  summary?: string;
  technologies?: string[];
  features?: string[];
  keywords?: string[];
  github?: string;
  repo?: string;
  report?: string;
  documentation?: string;
  demo?: string;
  liveDemo?: string;
  year?: string | number;
  role?: string;
  status?: string;
  category?: string;
}

interface AchievementObject {
  title?: string;
  name?: string;
  description?: string;
  url?: string;
  year?: string | number;
}
type AchievementEntry = string | AchievementObject;

interface KnowledgeBase {
  about: {
    name?: string;
    bio: string;
    department: string;
    university: string;
    goal?: string;
    location?: string;
  };
  skills: { list: SkillItem[] };
  currentLearning: LearningEntry[];
  projects: ProjectRecord[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    messenger?: string;
    twitter?: string;
  };
  contact: { email: string; phone?: string };
  resume: { url: string };
  achievements?: AchievementEntry[];
}

const KB = AI_KNOWLEDGE as unknown as KnowledgeBase;

/* ============================================================================
 * CONVERSATION MEMORY
 *
 * generateAIResponse(message: string) cannot change signature, so per-turn
 * context lives in a small module-scoped store: the active project (for
 * "github" / "report" / "technologies" follow-ups), the last topic, a
 * pending-clarification slot for the two-step GitHub disambiguation flow,
 * and the last fallback index (so fallback replies never repeat back to
 * back).
 * ==========================================================================*/

type Topic =
  | "greeting"
  | "smalltalk"
  | "about"
  | "career"
  | "contact"
  | "resume"
  | "education"
  | "skill"
  | "learning"
  | "achievement"
  | "social"
  | "project";

type PendingClarificationKind = "github-scope" | "github-project-pick";

interface PendingClarification {
  kind: PendingClarificationKind;
}

interface ConversationState {
  activeProject: ProjectRecord | null;
  lastTopic: Topic | null;
  pendingClarification: PendingClarification | null;
  lastFallbackIndex: number | null;
}

const conversation: ConversationState = {
  activeProject: null,
  lastTopic: null,
  pendingClarification: null,
  lastFallbackIndex: null,
};

function setActiveProject(project: ProjectRecord): void {
  conversation.activeProject = project;
  conversation.lastTopic = "project";
}

function setTopic(topic: Topic): void {
  conversation.lastTopic = topic;
}

function clearPendingClarification(): void {
  conversation.pendingClarification = null;
}

/* ============================================================================
 * GENERIC UTILITIES
 * ==========================================================================*/

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Picks a random item from `items`, avoiding the index used last time
 * (tracked via `lastIndexRef`), so the same reply never fires twice in a row.
 */
function pickRandomWithoutRepeat<T>(items: T[], lastIndexRef: { current: number | null }): T {
  if (items.length === 1) {
    lastIndexRef.current = 0;
    return items[0];
  }

  let index = Math.floor(Math.random() * items.length);
  while (index === lastIndexRef.current) {
    index = Math.floor(Math.random() * items.length);
  }

  lastIndexRef.current = index;
  return items[index];
}

/* ============================================================================
 * TEXT NORMALIZATION & FUZZY MATCHING
 * ==========================================================================*/

function normalizeInput(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/[_]+/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(input: string): string[] {
  return input.split(" ").filter(Boolean);
}

function tightenSpaces(input: string): string {
  return input.replace(/\s+/g, "");
}

function singularize(word: string): string {
  if (word.endsWith("ies") && word.length > 4) return `${word.slice(0, -3)}y`;
  if (word.endsWith("es") && word.length > 4) return word.slice(0, -2);
  if (word.endsWith("s") && !word.endsWith("ss") && word.length > 3) return word.slice(0, -1);
  return word;
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix: number[][] = Array.from({ length: rows }, () => new Array<number>(cols).fill(0));

  for (let i = 0; i < rows; i++) matrix[i][0] = i;
  for (let j = 0; j < cols; j++) matrix[0][j] = j;

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
    }
  }

  return matrix[rows - 1][cols - 1];
}

/** Edit-distance tolerance scales gently with word length. */
function typoThreshold(word: string): number {
  if (word.length <= 4) return 1;
  if (word.length <= 8) return 2;
  return 3;
}

/** True if `word` is close enough to `target` (typo-tolerant, plural-tolerant). */
function isCloseMatch(word: string, target: string): boolean {
  if (word === target) return true;

  const sw = singularize(word);
  const st = singularize(target);
  if (sw === st) return true;

  if (Math.abs(sw.length - st.length) <= typoThreshold(st) && levenshtein(sw, st) <= typoThreshold(st)) return true;
  return Math.abs(word.length - target.length) <= typoThreshold(target) && levenshtein(word, target) <= typoThreshold(target);
}

/** True if a single word/phrase keyword is present in the input (exact, tight, or fuzzy). */
function containsKeyword(input: string, keyword: string): boolean {
  const cleanKeyword = normalizeInput(keyword);
  if (!cleanKeyword) return false;

  if (input.includes(cleanKeyword)) return true;
  if (tightenSpaces(input).includes(tightenSpaces(cleanKeyword))) return true;

  const keywordWords = tokenize(cleanKeyword);
  const inputWords = tokenize(input);

  if (keywordWords.length === 1) {
    return inputWords.some((word) => isCloseMatch(word, keywordWords[0]));
  }

  // Multi-word phrases: every keyword word must appear somewhere in the
  // input, in any order — so "smart hydro" still matches "hydro smart".
  return keywordWords.every((kw) => inputWords.some((word) => isCloseMatch(word, kw)));
}

function matchesAny(input: string, keywords: string[]): boolean {
  return keywords.some((keyword) => containsKeyword(input, keyword));
}

function isShortUtterance(input: string, maxWords = 3): boolean {
  return tokenize(input).length <= maxWords;
}

/* ============================================================================
 * ALIAS DICTIONARIES
 * ==========================================================================*/

const GREETING_WORDS = [
  "hi",
  "hii",
  "hiii",
  "hello",
  "helloo",
  "hey",
  "yo",
  "sup",
  "wassup",
  "good morning",
  "good afternoon",
  "good evening",
  "assalamu alaikum",
  "assalamualaikum",
  "salam",
];

const GOODBYE_WORDS = ["bye", "goodbye", "later", "see you", "see ya", "take care", "good night", "gn", "catch you later"];

const THANKS_WORDS = ["thanks", "thank you", "thankyou", "thx", "ty", "appreciate it", "awesome thanks", "much appreciated"];

const SMALLTALK_HOW_ARE_YOU_WORDS = ["how are you", "how r u", "hows it going", "how's it going", "whats up", "what's up"];
const SMALLTALK_POSITIVE_WORDS = ["nice", "awesome", "great", "cool", "sounds good", "perfect", "amazing"];
const SMALLTALK_NICE_TO_MEET_WORDS = ["nice to meet you", "pleasure to meet you", "good to meet you"];

const HELP_WORDS = [
  "help",
  "what can you do",
  "what do you do",
  "how can you help",
  "what should i ask",
  "what can i ask",
  "capabilities",
  "who made you",
  "who created you",
  "who built you",
  "who coded you",
  "who designed you",
];

const ABOUT_WORDS = [
  "who are you",
  "introduce yourself",
  "introduce",
  "about you",
  "about",
  "abt",
  "bio",
  "biography",
  "background",
  "yourself",
  "tell me about yourself",
  "location",
  "where are you from",
];

const CAREER_WORDS = ["goal", "goals", "future", "career", "dream", "objective", "ambition", "aspiration", "plan for the future"];

const CONTACT_WORDS = ["hire", "hire me", "work together", "freelance", "reach you", "contact", "connect", "get in touch", "collaborate"];
const EMAIL_WORDS = ["email", "e mail", "gmail", "mail", "email address", "emaill"];
const PHONE_WORDS = ["phone", "phone number", "call you", "whatsapp", "number"];

const RESUME_WORDS = ["resume", "cv", "curriculum vitae", "download cv", "download resume", "website"];

const EDUCATION_WORDS = [
  "education",
  "educaton",
  "edu",
  "study",
  "studies",
  "school",
  "college",
  "kuet",
  "department",
  "degree",
  "academic",
  "university",
  "ssc",
  "hsc",
];

const SKILLS_WORDS = [
  "skill",
  "skills",
  "programming",
  "programing",
  "language",
  "languages",
  "technology",
  "technologies",
  "tech stack",
  "framework",
  "frameworks",
  "tool",
  "tools",
  "software",
  "what do you know",
  "office",
  "microsoft office",
  "c++",
  "verilog",
  "git",
  "vs code",
  "vscode",
];

const LEARNING_WORDS = [
  "currently learning",
  "current learning",
  "learning now",
  "what are you learning",
  "learning",
  "researching",
  "research",
  "studying now",
];

const ACHIEVEMENT_WORDS = [
  "achievement",
  "achievements",
  "award",
  "awards",
  "certificate",
  "certification",
  "honor",
  "recognition",
  "competition",
  "hackathon",
];

const PROJECT_BROWSE_WORDS = [
  "project",
  "projects",
  "show projects",
  "what have you built",
  "portfolio",
  "works",
  "builds",
  "software",
  "application",
  "app",
  "built",
  "build",
  "made",
  "created",
];

/** Explicit "this is about MY profile, not a project" phrasing. */
const PERSONAL_SCOPE_WORDS = ["your", "my", "profile", "personal", "yours"];

/** Explicit "I meant a project repository" phrasing, used mid-clarification. */
const PROJECT_REPO_SCOPE_WORDS = ["project", "repository", "repo", "project repository", "one of your projects"];

const SOCIAL_WORDS: Record<Exclude<keyof KnowledgeBase["socialLinks"], "github">, string[]> = {
  linkedin: ["linkedin", "lnkedin", "linkdin", "linked in", "linkedin profile"],
  facebook: ["facebook", "facebok", "fb"],
  instagram: ["instagram", "instgram", "insta", "ig"],
  messenger: ["messenger"],
  twitter: ["twitter", "x profile"],
};

type FollowUpKey =
  | "overview"
  | "features"
  | "technologies"
  | "github"
  | "report"
  | "demo"
  | "year"
  | "role"
  | "status"
  | "category"
  | "builder";

const FOLLOWUP_WORDS: Record<FollowUpKey, string[]> = {
  overview: ["overview", "summary", "describe it", "explain it", "tell me more", "details"],
  features: ["feature", "features", "functionality", "what does it do", "capabilities"],
  technologies: ["technology", "technologies", "tech stack", "stack", "built with", "tools used", "what was it built with"],
  github: ["github", "githu", "gitub", "githib", "repo", "repository", "source code", "code"],
  report: ["report", "documentation", "docs", "write up", "writeup", "paper"],
  demo: ["demo", "live demo", "live", "preview", "live site", "live link"],
  year: ["year", "when", "date", "timeline"],
  role: ["role", "my role", "responsibility", "responsibilities", "what part did you play"],
  status: ["status", "progress", "is it finished", "completed", "ongoing"],
  category: ["category", "type of project", "kind of project"],
  builder: ["who built it", "who made this", "who created this", "built by", "who built this"],
};

/* ============================================================================
 * PROJECT MATCHING
 * ==========================================================================*/

function projectSearchTerms(project: ProjectRecord): string[] {
  const terms = new Set<string>();
  terms.add(project.title);
  terms.add(project.slug.replace(/-/g, " "));
  terms.add(tightenSpaces(project.title));
  for (const keyword of project.keywords ?? []) terms.add(keyword);
  return Array.from(terms).map(normalizeInput).filter(Boolean);
}

/** Finds the strongest matching project referenced anywhere in the input, if any. */
function detectProjectReference(input: string): ProjectRecord | null {
  let best: { project: ProjectRecord; score: number } | null = null;

  for (const project of KB.projects) {
    let score = 0;
    for (const term of projectSearchTerms(project)) {
      if (containsKeyword(input, term)) score += term.length;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { project, score };
    }
  }

  return best?.project ?? null;
}

function detectFollowUpIntent(input: string): FollowUpKey | null {
  for (const key of Object.keys(FOLLOWUP_WORDS) as FollowUpKey[]) {
    if (matchesAny(input, FOLLOWUP_WORDS[key])) return key;
  }
  return null;
}

/* ============================================================================
 * FORMATTING HELPERS
 * ==========================================================================*/

function formatList(items: string[] | undefined, conjunction: "and" | "or" = "and"): string {
  const clean = (items ?? []).filter(Boolean);
  if (clean.length === 0) return "";
  if (clean.length === 1) return clean[0];
  if (clean.length === 2) return `${clean[0]} ${conjunction} ${clean[1]}`;
  return `${clean.slice(0, -1).join(", ")}, ${conjunction} ${clean[clean.length - 1]}`;
}

function projectDisplayName(project: ProjectRecord): string {
  return project.title;
}

function projectGithubUrl(project: ProjectRecord): string | undefined {
  return project.github ?? project.repo;
}

function projectReportUrl(project: ProjectRecord): string | undefined {
  return project.report ?? project.documentation;
}

function projectDemoUrl(project: ProjectRecord): string | undefined {
  return project.demo ?? project.liveDemo;
}

function projectLinks(project: ProjectRecord): AssistantLink[] {
  const links: AssistantLink[] = [];
  const github = projectGithubUrl(project);
  const report = projectReportUrl(project);
  const demo = projectDemoUrl(project);
  if (github) links.push({ label: "GitHub", url: github });
  if (report) links.push({ label: "Report", url: report });
  if (demo) links.push({ label: "Live Demo", url: demo });
  return links;
}

/* ============================================================================
 * RESPONSE BUILDERS — PROJECTS
 * ==========================================================================*/

/** Full, rich project response — only the fields that actually exist are shown. */
function buildProjectResponse(project: ProjectRecord, followUp?: FollowUpKey | null): AssistantResponse {
  if (followUp) return buildProjectFollowUpResponse(project, followUp);

  const lines: string[] = [projectDisplayName(project)];

  const overview = project.overview ?? project.summary ?? project.description;
  if (overview) lines.push(overview);

  const metaParts: string[] = [];
  if (project.role) metaParts.push(`Role: ${project.role}`);
  if (project.status) metaParts.push(`Status: ${project.status}`);
  if (project.year) metaParts.push(`Year: ${project.year}`);
  if (project.category) metaParts.push(`Category: ${project.category}`);
  if (metaParts.length) lines.push(metaParts.join(" • "));

  if (project.technologies?.length) lines.push(`Technologies: ${formatList(project.technologies)}.`);
  if (project.features?.length) lines.push(`Key features: ${formatList(project.features)}.`);

  const links = projectLinks(project);
  return { text: lines.join("\n"), links: links.length ? links : undefined };
}

function buildProjectFollowUpResponse(project: ProjectRecord, followUp: FollowUpKey): AssistantResponse {
  switch (followUp) {
    case "overview":
      return buildProjectResponse(project);

    case "features":
      return project.features?.length
        ? { text: `Key features of ${projectDisplayName(project)}: ${formatList(project.features)}.` }
        : { text: `I don't have a detailed feature list for ${projectDisplayName(project)} yet.` };

    case "technologies":
      return project.technologies?.length
        ? { text: `${projectDisplayName(project)} was built using ${formatList(project.technologies)}.` }
        : { text: `I don't have a technology list recorded for ${projectDisplayName(project)} yet.` };

    case "github": {
      const url = projectGithubUrl(project);
      return url
        ? { text: `Here's the GitHub repository for ${projectDisplayName(project)}:`, links: [{ label: "GitHub", url }] }
        : { text: `${projectDisplayName(project)} doesn't have a public GitHub link available right now.` };
    }

    case "report": {
      const url = projectReportUrl(project);
      return url
        ? { text: `Here's the report for ${projectDisplayName(project)}:`, links: [{ label: "Report", url }] }
        : { text: `I don't have a report or write-up published for ${projectDisplayName(project)} yet.` };
    }

    case "demo": {
      const url = projectDemoUrl(project);
      return url
        ? { text: `Here's the live demo for ${projectDisplayName(project)}:`, links: [{ label: "Live Demo", url }] }
        : { text: `${projectDisplayName(project)} doesn't have a live demo available right now.` };
    }

    case "year":
      return project.year
        ? { text: `${projectDisplayName(project)} was worked on in ${project.year}.` }
        : { text: `I don't have a specific year recorded for ${projectDisplayName(project)}.` };

    case "role":
    case "builder":
      return project.role
        ? { text: `My role on ${projectDisplayName(project)} was: ${project.role}.` }
        : { text: `I built ${projectDisplayName(project)} myself as part of my portfolio.` };

    case "status":
      return project.status
        ? { text: `${projectDisplayName(project)} is currently: ${project.status}.` }
        : { text: `I don't have a status recorded for ${projectDisplayName(project)}.` };

    case "category":
      return project.category
        ? { text: `${projectDisplayName(project)} falls under the ${project.category} category.` }
        : { text: `I don't have a category tag recorded for ${projectDisplayName(project)}.` };
  }
}

function buildProjectListResponse(): AssistantResponse {
  const titles = KB.projects.map((p) => p.title);
  return { text: `I've worked on a few projects: ${formatList(titles)}. Which one would you like to hear about?` };
}

function buildFollowUpAmbiguousResponse(followUp: FollowUpKey): AssistantResponse {
  const label = followUp.charAt(0).toUpperCase() + followUp.slice(1);
  return { text: `Which project's ${label} would you like? I've worked on: ${formatList(KB.projects.map((p) => p.title))}.` };
}

function buildGithubScopeClarification(): AssistantResponse {
  return { text: "Do you mean my GitHub profile, or one of my project repositories?" };
}

function buildGithubProjectPickPrompt(): AssistantResponse {
  return { text: `Sure — which project's GitHub would you like? I've worked on: ${formatList(KB.projects.map((p) => p.title))}.` };
}

/* ============================================================================
 * RESPONSE BUILDERS — SOCIAL / CONTACT
 * ==========================================================================*/

function buildSocialResponse(platform: keyof KnowledgeBase["socialLinks"]): AssistantResponse {
  const url = KB.socialLinks?.[platform];
  const label = platform.charAt(0).toUpperCase() + platform.slice(1);
  if (!url) return { text: `I don't have a ${label} link listed yet.` };
  return { text: `Here's my ${label}:`, links: [{ label, url }] };
}

function buildEmailResponse(): AssistantResponse {
  if (!KB.contact?.email) return { text: "I don't have an email listed yet — try LinkedIn or GitHub instead." };
  return { text: "You can reach me by email:", links: [{ label: "Email", url: `mailto:${KB.contact.email}` }] };
}

function buildPhoneResponse(): AssistantResponse {
  if (!KB.contact?.phone) return { text: "I haven't listed a phone number publicly, but email works great too!" };
  return { text: `You can reach me at ${KB.contact.phone}.` };
}

function buildContactResponse(): AssistantResponse {
  const links: AssistantLink[] = [];
  if (KB.contact?.email) links.push({ label: "Email", url: `mailto:${KB.contact.email}` });
  if (KB.socialLinks?.linkedin) links.push({ label: "LinkedIn", url: KB.socialLinks.linkedin });
  if (KB.socialLinks?.github) links.push({ label: "GitHub", url: KB.socialLinks.github });
  return { text: "I'd love to hear from you! Here's the best way to reach me:", links: links.length ? links : undefined };
}

function buildResumeResponse(): AssistantResponse {
  if (!KB.resume?.url) return { text: "My resume isn't linked yet, but feel free to ask about my skills or projects instead." };
  return { text: "You can view or download my resume here:", links: [{ label: "View Resume", url: KB.resume.url }] };
}

/* ============================================================================
 * RESPONSE BUILDERS — ABOUT / CAREER / SKILLS / EDUCATION / LEARNING / ACHIEVEMENTS
 * ==========================================================================*/

function buildAboutResponse(): AssistantResponse {
  const { bio, department, university, goal, location } = KB.about;
  const goalLine = goal ? ` My current goal is ${goal}.` : "";
  const locationLine = location ? ` I'm based in ${location}.` : "";
  return { text: `${bio} I'm studying ${department} at ${university}.${goalLine}${locationLine}` };
}

function buildCareerResponse(): AssistantResponse {
  if (!KB.about.goal) {
    return {
      text: "I'm always working toward growing as an engineer and taking on more ambitious projects. Want to hear about my current projects or skills instead?",
    };
  }
  return { text: `Looking ahead, my goal is: ${KB.about.goal}.` };
}

function buildSkillsResponse(): AssistantResponse {
  const grouped = new Map<string, string[]>();
  for (const skill of KB.skills.list) {
    const bucket = grouped.get(skill.category) ?? [];
    bucket.push(skill.name);
    grouped.set(skill.category, bucket);
  }
  if (grouped.size === 0) return { text: "I haven't listed my skills yet, but check back soon!" };

  const parts = Array.from(grouped.entries()).map(([category, names]) => `${category} (${formatList(names)})`);
  return { text: `Here's what I work with: ${formatList(parts)}.` };
}

function buildEducationResponse(): AssistantResponse {
  const { department, university } = KB.about;
  return { text: `I'm currently studying ${department} at ${university}. Want to know what I'm currently learning too?` };
}

function learningEntryLabel(entry: LearningEntry): string {
  return typeof entry === "string" ? entry : entry.label;
}

function buildLearningResponse(): AssistantResponse {
  if (!KB.currentLearning?.length) return { text: "I don't have anything specific listed as 'currently learning' right now." };
  return { text: `Right now I'm focusing on: ${formatList(KB.currentLearning.map(learningEntryLabel))}.` };
}

function achievementLabel(entry: AchievementEntry): string {
  return typeof entry === "string" ? entry : entry.title ?? entry.name ?? "an achievement";
}

function buildAchievementResponse(): AssistantResponse {
  if (!KB.achievements?.length) return { text: "I don't have any achievements listed yet, but I'm always working toward new ones!" };

  const links: AssistantLink[] = KB.achievements
    .filter((entry): entry is AchievementObject => typeof entry === "object" && Boolean(entry.url))
    .map((entry) => ({ label: entry.title ?? entry.name ?? "Achievement", url: entry.url as string }));

  return {
    text: `Some of my achievements include: ${formatList(KB.achievements.map(achievementLabel))}.`,
    links: links.length ? links : undefined,
  };
}

/* ============================================================================
 * RESPONSE BUILDERS — GREETING / SMALL TALK / HELP / FALLBACK
 * ==========================================================================*/

const GREETING_REPLIES = [
  "Hey there! 👋 Ask me about my projects, skills, education, or how to get in touch.",
  "Hello! Great to have you here. Want to know about my projects, skills, or background?",
  "Hi! I'm happy to help. Ask me anything about my work, skills, or achievements.",
  "Hey! Good to see you. Curious about my projects, skills, or resume?",
];

const GOODBYE_REPLIES = [
  "Take care! Feel free to come back anytime you want to know more. 👋",
  "Goodbye! Hope to chat again soon.",
  "See you later! Thanks for stopping by.",
];

const THANKS_REPLIES = [
  "You're very welcome! Let me know if there's anything else you'd like to explore.",
  "Anytime! Happy to help with anything else you're curious about.",
  "No problem at all — feel free to ask more.",
];

function buildGreetingResponse(): AssistantResponse {
  return { text: pickRandom(GREETING_REPLIES) };
}

function buildGoodbyeResponse(): AssistantResponse {
  return { text: pickRandom(GOODBYE_REPLIES) };
}

function buildThanksResponse(): AssistantResponse {
  return { text: pickRandom(THANKS_REPLIES) };
}

function buildSmallTalkResponse(input: string): AssistantResponse {
  if (matchesAny(input, SMALLTALK_NICE_TO_MEET_WORDS)) {
    return { text: "Nice to meet you too! What would you like to explore first — projects, skills, or something else?" };
  }
  if (matchesAny(input, SMALLTALK_POSITIVE_WORDS)) {
    return { text: "Glad to hear that! Want to keep exploring — maybe my projects or skills?" };
  }
  return { text: "I'm doing great, thanks for asking! Ready to help you explore this portfolio — what would you like to know?" };
}

function buildHelpResponse(input: string): AssistantResponse {
  if (matchesAny(input, ["who made you", "who created you", "who built you", "who coded you", "who designed you"])) {
    const name = KB.about.name ?? "the developer behind this portfolio";
    return { text: `I was built by ${name} to help you explore this portfolio without leaving the page.` };
  }
  return {
    text:
      "I can tell you about projects, skills, education, current learning, achievements, resume, and how to get in touch. Just ask naturally, like 'tell me about HydroSmart' or 'what are your skills?'.",
  };
}

const FALLBACK_REPLIES = [
  "I'm not completely sure what you meant.",
  "Hmm, I didn't quite follow that.",
  "I might have missed what you're asking.",
  "That one's a bit unclear to me.",
  "I'm not 100% sure how to answer that.",
];

function buildFallbackResponse(): AssistantResponse {
  const opener = pickRandomWithoutRepeat(FALLBACK_REPLIES, {
    get current() {
      return conversation.lastFallbackIndex;
    },
    set current(value: number | null) {
      conversation.lastFallbackIndex = value;
    },
  });

  return {
    text:
      `${opener} You can ask me about:\n` +
      "• Projects\n• Skills\n• Education\n• Resume\n• Contact\n• Current Learning\n• Achievements\n\n" +
      "Examples:\n" +
      '"Tell me about HydroSmart"\n' +
      '"Show FPGA Github"\n' +
      '"What programming languages do you know?"\n' +
      '"Download your CV"',
  };
}

/* ============================================================================
 * PHRASING HELPERS
 * ==========================================================================*/

/** True if the phrasing signals "my own profile" rather than a project follow-up. */
function isExplicitSocialPhrasing(input: string): boolean {
  return matchesAny(input, PERSONAL_SCOPE_WORDS);
}

/* ============================================================================
 * PENDING CLARIFICATION (two-step GitHub disambiguation)
 * ==========================================================================*/

function resolvePendingClarification(input: string): AssistantResponse | null {
  const pending = conversation.pendingClarification;
  if (!pending) return null;

  if (pending.kind === "github-scope") {
    clearPendingClarification();

    if (isExplicitSocialPhrasing(input)) {
      setTopic("social");
      return buildSocialResponse("github");
    }

    const namedProject = detectProjectReference(input);
    if (namedProject) {
      setActiveProject(namedProject);
      return buildProjectFollowUpResponse(namedProject, "github");
    }

    if (matchesAny(input, PROJECT_REPO_SCOPE_WORDS)) {
      conversation.pendingClarification = { kind: "github-project-pick" };
      return buildGithubProjectPickPrompt();
    }

    // Unclear answer — ask which project instead of dead-ending on a fallback.
    conversation.pendingClarification = { kind: "github-project-pick" };
    return buildGithubProjectPickPrompt();
  }

  // pending.kind === "github-project-pick"
  const namedProject = detectProjectReference(input);
  if (namedProject) {
    clearPendingClarification();
    setActiveProject(namedProject);
    return buildProjectFollowUpResponse(namedProject, "github");
  }

  return buildGithubProjectPickPrompt();
}

/* ============================================================================
 * PRIORITY-ORDERED INTENT HANDLERS
 *
 * Each handler either returns a response (claiming the turn) or null
 * (deferring to the next handler). They run strictly in this order:
 *
 *   Greeting -> Goodbye -> Thanks -> Small Talk -> Help -> About -> Career
 *   -> Contact -> Resume -> Education -> Skills -> Learning -> Achievements
 *   -> Social Links -> Projects -> Project Follow-up -> Fallback
 *
 * This fixes the previous routing bugs: high-priority, unambiguous intents
 * (contact, email, resume, education, skills...) are resolved long before
 * project matching ever runs, so they can no longer be shadowed by a loose
 * project-keyword match.
 * ==========================================================================*/

type Handler = (input: string) => AssistantResponse | null;

const handleGreeting: Handler = (input) => (matchesAny(input, GREETING_WORDS) ? buildGreetingResponse() : null);

const handleGoodbye: Handler = (input) => (matchesAny(input, GOODBYE_WORDS) ? buildGoodbyeResponse() : null);

const handleThanks: Handler = (input) => (matchesAny(input, THANKS_WORDS) ? buildThanksResponse() : null);

const handleSmallTalk: Handler = (input) => {
  if (!matchesAny(input, SMALLTALK_HOW_ARE_YOU_WORDS) && !matchesAny(input, SMALLTALK_POSITIVE_WORDS) && !matchesAny(input, SMALLTALK_NICE_TO_MEET_WORDS)) {
    return null;
  }
  setTopic("smalltalk");
  return buildSmallTalkResponse(input);
};

const handleHelp: Handler = (input) => {
  if (!matchesAny(input, HELP_WORDS)) return null;
  return buildHelpResponse(input);
};

const handleAbout: Handler = (input) => {
  if (!matchesAny(input, ABOUT_WORDS)) return null;
  setTopic("about");
  return buildAboutResponse();
};

const handleCareer: Handler = (input) => {
  if (!matchesAny(input, CAREER_WORDS)) return null;
  setTopic("career");
  return buildCareerResponse();
};

const handleContact: Handler = (input) => {
  const isEmail = matchesAny(input, EMAIL_WORDS);
  const isPhone = matchesAny(input, PHONE_WORDS);
  const isGeneralContact = matchesAny(input, CONTACT_WORDS);

  if (!isEmail && !isPhone && !isGeneralContact) return null;

  setTopic("contact");
  if (isEmail) return buildEmailResponse();
  if (isPhone) return buildPhoneResponse();
  return buildContactResponse();
};

const handleResume: Handler = (input) => {
  if (!matchesAny(input, RESUME_WORDS)) return null;
  setTopic("resume");
  return buildResumeResponse();
};

const handleEducation: Handler = (input) => {
  if (!matchesAny(input, EDUCATION_WORDS)) return null;
  setTopic("education");
  return buildEducationResponse();
};

const handleSkills: Handler = (input) => {
  if (!matchesAny(input, SKILLS_WORDS)) return null;
  setTopic("skill");
  return buildSkillsResponse();
};

const handleLearning: Handler = (input) => {
  if (!matchesAny(input, LEARNING_WORDS)) return null;
  setTopic("learning");
  return buildLearningResponse();
};

const handleAchievements: Handler = (input) => {
  if (!matchesAny(input, ACHIEVEMENT_WORDS)) return null;
  setTopic("achievement");
  return buildAchievementResponse();
};

/**
 * Handles LinkedIn / Facebook / Instagram / Messenger / Twitter directly,
 * and runs the GitHub disambiguation logic:
 *   - explicit personal phrasing ("your github", "github profile") -> profile
 *   - an active project already in context -> that project's GitHub
 *   - a project named in the same message -> that project's GitHub
 *   - otherwise -> ask which one they mean (two-step clarification)
 */
const handleSocialLinks: Handler = (input) => {
  for (const platform of Object.keys(SOCIAL_WORDS) as (keyof typeof SOCIAL_WORDS)[]) {
    if (matchesAny(input, SOCIAL_WORDS[platform])) {
      setTopic("social");
      return buildSocialResponse(platform);
    }
  }

  const mentionsGithub = matchesAny(input, FOLLOWUP_WORDS.github);
  if (!mentionsGithub) return null;

  if (isExplicitSocialPhrasing(input) || containsKeyword(input, "github profile")) {
    setTopic("social");
    return buildSocialResponse("github");
  }

  if (conversation.activeProject) {
    return buildProjectFollowUpResponse(conversation.activeProject, "github");
  }

  const namedProject = detectProjectReference(input);
  if (namedProject) {
    setActiveProject(namedProject);
    return buildProjectFollowUpResponse(namedProject, "github");
  }

  conversation.pendingClarification = { kind: "github-scope" };
  return buildGithubScopeClarification();
};

/** Explicit project mention (name/keyword/slug), optionally combined with a follow-up in the same message. */
const handleProjects: Handler = (input) => {
  const namedProject = detectProjectReference(input);
  if (namedProject) {
    setActiveProject(namedProject);
    const followUp = detectFollowUpIntent(input);
    return buildProjectResponse(namedProject, followUp);
  }

  if (matchesAny(input, PROJECT_BROWSE_WORDS)) {
    setTopic("project");
    return buildProjectListResponse();
  }

  return null;
};

/** Bare follow-up keywords (features, technologies, report, demo, year, role, status, category, builder). */
const handleProjectFollowUp: Handler = (input) => {
  const followUp = detectFollowUpIntent(input);
  if (!followUp) return null;

  if (conversation.activeProject) {
    return buildProjectFollowUpResponse(conversation.activeProject, followUp);
  }

  if (isShortUtterance(input, 4)) {
    return buildFollowUpAmbiguousResponse(followUp);
  }

  return null;
};

const PIPELINE: Handler[] = [
  handleGreeting,
  handleGoodbye,
  handleThanks,
  handleSmallTalk,
  handleHelp,
  handleAbout,
  handleCareer,
  handleContact,
  handleResume,
  handleEducation,
  handleSkills,
  handleLearning,
  handleAchievements,
  handleSocialLinks,
  handleProjects,
  handleProjectFollowUp,
];

/* ============================================================================
 * CORE ENGINE
 * ==========================================================================*/

export function generateAIResponse(message: string): AssistantResponse {
  const input = normalizeInput(message);

  if (!input) {
    return { text: "I didn't quite catch that — could you type your question again?" };
  }

  const clarified = resolvePendingClarification(input);
  if (clarified) return clarified;

  for (const handler of PIPELINE) {
    const response = handler(input);
    if (response) return response;
  }

  return buildFallbackResponse();
}

/* ============================================================================
 * OPTIONAL UTILITIES — additive, safe to ignore, do not change the public API
 * ==========================================================================*/

export function resetAssistantMemory(): void {
  conversation.activeProject = null;
  conversation.lastTopic = null;
  conversation.pendingClarification = null;
  conversation.lastFallbackIndex = null;
}

export function getActiveProjectTitle(): string | null {
  return conversation.activeProject?.title ?? null;
}