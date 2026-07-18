/**
 * lib/ai/intents.ts
 *
 * The intent taxonomy for Ask Siam AI, plus the phrase bank used to
 * classify free-form user input into an intent. This is the single place
 * that defines "what a user might say" for every conversational category —
 * response generation and knowledge retrieval never hardcode phrasing.
 */

export type Intent =
  | "greeting"
  | "goodbye"
  | "thanks"
  | "small_talk"
  | "help"
  | "about"
  | "education"
  | "skills"
  | "current_learning"
  | "projects_list"
  | "certificates"
  | "achievements"
  | "experience"
  | "future_goals"
  | "availability"
  | "contact"
  | "email"
  | "phone"
  | "resume"
  | "location"
  | "github"
  | "linkedin"
  | "facebook"
  | "messenger"
  | "twitter"
  | "unknown";

/**
 * Follow-up intents only make sense in the context of a specific project
 * (either named in the same message, or the "active" project from earlier
 * in the conversation). Kept separate from the general Intent list because
 * they compose with a project reference rather than standing alone.
 */
export type ProjectFollowUp =
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

export const INTENT_PATTERNS: Record<Intent, string[]> = {
  greeting: [
    "hi", "hii", "hiii", "hello", "helloo", "hey", "yo", "sup", "wassup",
    "good morning", "good afternoon", "good evening", "good day",
    "assalamu alaikum", "assalamualaikum", "salam", "hey there", "howdy",
  ],

  goodbye: [
    "bye", "goodbye", "later", "see you", "see ya", "take care",
    "good night", "gn", "catch you later", "i have to go", "talk later",
  ],

  thanks: [
    "thanks", "thank you", "thankyou", "thx", "ty", "appreciate it",
    "awesome thanks", "much appreciated", "great thanks", "thanks a lot",
  ],

  small_talk: [
    "how are you", "how r u", "hows it going", "how is it going",
    "whats up", "what is up", "nice to meet you", "pleasure to meet you",
    "good to meet you", "nice", "awesome", "great", "cool", "sounds good",
    "perfect", "amazing", "you are cool", "you are smart",
  ],

  help: [
    "help", "what can you do", "what do you do", "how can you help",
    "what should i ask", "what can i ask", "capabilities",
    "who made you", "who created you", "who built you", "who coded you",
    "who designed you", "why were you built", "why do you exist",
    "are you a real ai", "are you chatgpt",
  ],

  about: [
    "who are you", "introduce yourself", "introduce", "about you", "about",
    "abt", "bio", "biography", "background", "yourself",
    "tell me about yourself", "tell me about siam", "who is siam",
    "about siam", "can you introduce yourself", "what do you do siam",
    "who is this",
  ],

  education: [
    "education", "educaton", "edu", "study", "studies", "school", "college",
    "kuet", "department", "degree", "academic", "university", "ssc", "hsc",
    "where do you study", "what do you study", "your university",
  ],

  skills: [
    "skill", "skills", "programming", "programing", "language", "languages",
    "technology", "technologies", "tech stack", "framework", "frameworks",
    "tool", "tools", "software", "what do you know", "office",
    "microsoft office", "c++", "verilog", "git", "vs code", "vscode",
    "what languages do you know", "what frameworks do you use",
    "your tech stack", "programming languages",
  ],

  current_learning: [
    "currently learning", "current learning", "learning now",
    "what are you learning", "learning", "researching", "research",
    "studying now", "what are you studying right now",
  ],

  projects_list: [
    "project", "projects", "show projects", "show me your projects",
    "what have you built", "portfolio", "works", "builds", "application",
    "app", "built", "build", "made", "created", "what did you make",
    "things you built", "recent work", "your work", "show your work",
  ],

  certificates: [
    "certificate", "certificates", "certification", "certifications",
    "cert", "certs", "credential", "credentials",
  ],

  achievements: [
    "achievement", "achievements", "award", "awards", "honor",
    "recognition", "competition", "hackathon", "won", "prize",
  ],

  experience: [
    "experience", "work experience", "job history", "internship experience",
    "professional experience", "have you worked", "past jobs",
  ],

  future_goals: [
    "goal", "goals", "future", "career", "dream", "objective", "ambition",
    "aspiration", "plan for the future", "future plans", "where do you see yourself",
  ],

  availability: [
    "available", "availability", "internship", "open to work",
    "looking for a job", "hiring", "open for internship", "free for work",
    "part time", "full time",
  ],

  contact: [
    "hire", "hire me", "work together", "freelance", "reach you", "contact",
    "connect", "get in touch", "collaborate", "how can i contact you",
    "how do i reach you",
  ],

  email: [
    "email", "e mail", "gmail", "mail", "email address", "emaill",
    "send email", "your email", "contact email",
  ],

  phone: [
    "phone", "phone number", "call you", "whatsapp", "number", "mobile number",
  ],

  resume: [
    "resume", "cv", "curriculum vitae", "download cv", "download resume",
    "download your cv", "website", "your resume",
  ],

  location: [
    "location", "where are you from", "where do you live", "based in",
    "your location", "which city",
  ],

  github: [
    "github", "githu", "gitub", "githib", "repo", "repository",
    "repositories", "source code", "code", "coding profile", "open github",
    "github link", "github profile",
  ],

  linkedin: [
    "linkedin", "lnkedin", "linkdin", "linked in", "linkedin profile", "li",
    "professional profile", "connect on linkedin", "open linkedin",
  ],

  facebook: ["facebook", "facebok", "fb", "facebook profile", "open facebook"],

  messenger: ["messenger", "fb messenger", "message me on messenger"],

  twitter: ["twitter", "x profile", "open twitter", "your x"],

  unknown: [],
};

/** Trigger phrases for project-scoped follow-up questions. */
export const FOLLOWUP_PATTERNS: Record<ProjectFollowUp, string[]> = {
  overview: ["overview", "summary", "describe it", "explain it", "tell me more", "details"],
  features: ["feature", "features", "functionality", "what does it do", "capabilities"],
  technologies: [
    "technology", "technologies", "tech stack", "stack", "built with",
    "tools used", "what was it built with", "which technologies did you use",
  ],
  github: ["github", "githu", "gitub", "githib", "repo", "repository", "source code", "code", "see its source code"],
  report: ["report", "documentation", "docs", "write up", "writeup", "paper"],
  demo: ["demo", "live demo", "live", "preview", "live site", "live link"],
  year: ["year", "when", "date", "timeline"],
  role: ["role", "my role", "responsibility", "responsibilities", "what part did you play"],
  status: ["status", "progress", "is it finished", "completed", "ongoing"],
  category: ["category", "type of project", "kind of project"],
  builder: ["who built it", "who made this", "who created this", "built by", "who built this"],
};

/** Explicit "this is about MY profile, not a project" phrasing (for GitHub disambiguation). */
export const PERSONAL_SCOPE_WORDS = ["your", "my", "profile", "personal", "yours"];

/** Explicit "I meant a project repository" phrasing, used mid-clarification. */
export const PROJECT_REPO_SCOPE_WORDS = ["project", "repository", "repo", "project repository", "one of your projects"];

/** Social-platform intents that resolve to a plain link lookup. */
export const SOCIAL_INTENTS = ["linkedin", "facebook", "messenger", "twitter"] as const;
export type SocialIntent = (typeof SOCIAL_INTENTS)[number];