/**
 * lib/ai/response-generator.ts
 *
 * Turns (intent + retrieved knowledge) into an AssistantEngineResponse.
 * Every reply category has a pool of natural-sounding variants so the
 * assistant doesn't repeat itself verbatim across a conversation.
 */

import { AssistantEngineResponse, ChatLink } from "@/types/ai";
import {
  achievementLabel,
  achievementUrl,
  findSocialLink,
  getAbout,
  getAllAchievements,
  getAllProjects,
  getCareerGoal,
  getCertificateLikeAchievements,
  getCurrentLearning,
  getDisplayName,
  getEducationSummary,
  getEmail,
  getLocation,
  getPhone,
  getProjectDemoUrl,
  getProjectGithubUrl,
  getProjectReportUrl,
  getProjectOverview,
  getResumeUrl,
  getSkillsGroupedByCategory,
  ProjectRecord,
} from "./knowledge";
import { formatList, pickRandom, pickRandomWithoutRepeat } from "./nlp-utils";
import { ProjectFollowUp } from "./intents";
import { memory } from "./memory";

/* ---------------------------------------------------------------------- */
/* Small talk / conversational glue                                       */
/* ---------------------------------------------------------------------- */

const GREETING_REPLIES = [
  `Hey there! 👋 Ask me about my projects, skills, education, or how to get in touch.`,
  `Hello! Great to have you here. Want to know about my projects, skills, or background?`,
  `Hi! I'm happy to help. Ask me anything about my work, skills, or achievements.`,
  `Hey! Good to see you. Curious about my projects, skills, or resume?`,
];

const GOODBYE_REPLIES = [
  `Take care! Feel free to come back anytime you want to know more. 👋`,
  `Goodbye! Hope to chat again soon.`,
  `See you later! Thanks for stopping by.`,
];

const THANKS_REPLIES = [
  `You're very welcome! Let me know if there's anything else you'd like to explore.`,
  `Anytime! Happy to help with anything else you're curious about.`,
  `No problem at all — feel free to ask more.`,
];

const FALLBACK_REPLIES = [
  `I couldn't find that in Siam's portfolio.`,
  `I'm not completely sure what you meant.`,
  `Hmm, I didn't quite follow that.`,
  `I might have missed what you're asking.`,
];

export function buildGreetingResponse(): AssistantEngineResponse {
  return { text: pickRandom(GREETING_REPLIES) };
}

export function buildGoodbyeResponse(): AssistantEngineResponse {
  return { text: pickRandom(GOODBYE_REPLIES) };
}

export function buildThanksResponse(): AssistantEngineResponse {
  return { text: pickRandom(THANKS_REPLIES) };
}

export function buildSmallTalkResponse(input: string): AssistantEngineResponse {
  if (/nice to meet you|pleasure to meet you|good to meet you/.test(input)) {
    return { text: "Nice to meet you too! What would you like to explore first — projects, skills, or something else?" };
  }
  if (/how are you|how r u|hows it going|whats up/.test(input)) {
    return { text: "I'm doing great, thanks for asking! Ready to help you explore this portfolio — what would you like to know?" };
  }
  return { text: "Glad to hear that! Want to keep exploring — maybe my projects or skills?" };
}

export function buildHelpResponse(input: string): AssistantEngineResponse {
  if (/who made you|who created you|who built you|who coded you|who designed you|why were you built/.test(input)) {
    return { text: `I was built by ${getDisplayName()} to help you explore this portfolio without leaving the page.` };
  }
  return {
    text:
      "I can tell you about projects, skills, education, current learning, achievements, resume, and how to get in touch. " +
      "Just ask naturally, like \"tell me about HydroSmart\" or \"what are your skills?\".",
  };
}

export function buildFallbackResponse(): AssistantEngineResponse {
  const opener = pickRandomWithoutRepeat(FALLBACK_REPLIES, memory.fallbackIndexRef);
  return {
    text:
      `${opener} You can ask me about:\n` +
      "• Projects\n• Skills\n• Education\n• Resume\n• Contact\n• Current Learning\n• Achievements\n\n" +
      "Try things like:\n" +
      '"Tell me about HydroSmart"\n' +
      '"Show FPGA Github"\n' +
      '"What programming languages do you know?"\n' +
      '"Download your CV"',
  };
}

/* ---------------------------------------------------------------------- */
/* About / education / career                                             */
/* ---------------------------------------------------------------------- */

export function buildAboutResponse(): AssistantEngineResponse {
  const { bio, university, department, goal, location } = getAbout();
  const eduLine = university ? ` I'm studying ${department} at ${university}.` : "";
  const goalLine = goal ? ` My current goal is ${goal}.` : "";
  const locationLine = location ? ` I'm based in ${location}.` : "";
  return { text: `${bio}${eduLine}${goalLine}${locationLine}` };
}

export function buildEducationResponse(): AssistantEngineResponse {
  const { department, university } = getEducationSummary();
  if (!university) return { text: "I don't have my education details listed yet." };
  return { text: `I'm currently studying ${department} at ${university}. Want to know what I'm currently learning too?` };
}

export function buildCareerResponse(): AssistantEngineResponse {
  const goal = getCareerGoal();
  if (!goal) {
    return {
      text: "I'm always working toward growing as an engineer and taking on more ambitious projects. Want to hear about my current projects or skills instead?",
    };
  }
  return { text: `Looking ahead, my goal is: ${goal}.` };
}

export function buildAvailabilityResponse(): AssistantEngineResponse {
  return {
    text:
      "I'm generally open to internships and interesting collaborations — the best way to find out about current availability is to reach out directly.",
    links: contactLinks(),
  };
}

export function buildExperienceResponse(): AssistantEngineResponse {
  return {
    text: "I don't have a formal work-experience section listed yet, but my projects are a good way to see what I've actually built and worked on.",
  };
}

/* ---------------------------------------------------------------------- */
/* Skills / learning                                                      */
/* ---------------------------------------------------------------------- */

export function buildSkillsResponse(): AssistantEngineResponse {
  const grouped = getSkillsGroupedByCategory();
  if (grouped.size === 0) return { text: "I haven't listed my skills yet, but check back soon!" };

  const parts = Array.from(grouped.entries()).map(([category, names]) => `${category} (${formatList(names)})`);
  return { text: `Here's what I work with: ${formatList(parts)}.` };
}

export function buildLearningResponse(): AssistantEngineResponse {
  const learning = getCurrentLearning();
  if (learning.length === 0) return { text: "I don't have anything specific listed as 'currently learning' right now." };
  return { text: `Right now I'm focusing on: ${formatList(learning)}.` };
}

/* ---------------------------------------------------------------------- */
/* Achievements / certificates                                            */
/* ---------------------------------------------------------------------- */

export function buildAchievementResponse(): AssistantEngineResponse {
  const achievements = getAllAchievements();
  if (achievements.length === 0) return { text: "I don't have any achievements listed yet, but I'm always working toward new ones!" };

  const links: ChatLink[] = achievements
    .map((entry) => ({ label: achievementLabel(entry), url: achievementUrl(entry) }))
    .filter((l): l is ChatLink => Boolean(l.url));

  return {
    text: `Some of my achievements include: ${formatList(achievements.map(achievementLabel))}.`,
    links: links.length ? links : undefined,
  };
}

export function buildCertificatesResponse(): AssistantEngineResponse {
  const certs = getCertificateLikeAchievements();
  if (certs.length === 0) return { text: "I don't have any certificates listed yet." };

  const links: ChatLink[] = certs
    .map((entry) => ({ label: achievementLabel(entry), url: achievementUrl(entry) }))
    .filter((l): l is ChatLink => Boolean(l.url));

  return {
    text: `Here are my certificates: ${formatList(certs.map(achievementLabel))}.`,
    links: links.length ? links : undefined,
  };
}

/* ---------------------------------------------------------------------- */
/* Contact / social / resume / location                                   */
/* ---------------------------------------------------------------------- */

function contactLinks(): ChatLink[] {
  const links: ChatLink[] = [];
  const email = getEmail();
  const linkedin = findSocialLink("linkedin");
  const github = findSocialLink("github");
  if (email) links.push({ label: "Email", url: `mailto:${email}` });
  if (linkedin) links.push({ label: "LinkedIn", url: linkedin.url });
  if (github) links.push({ label: "GitHub", url: github.url });
  return links;
}

export function buildContactResponse(): AssistantEngineResponse {
  const links = contactLinks();
  return { text: "I'd love to hear from you! Here's the best way to reach me:", links: links.length ? links : undefined };
}

export function buildEmailResponse(): AssistantEngineResponse {
  const email = getEmail();
  if (!email) return { text: "I don't have an email listed yet — try LinkedIn or GitHub instead." };
  return { text: `📧 ${email}\n\nClick below to send an email.`, links: [{ label: "Email", url: `mailto:${email}` }] };
}

export function buildPhoneResponse(): AssistantEngineResponse {
  const phone = getPhone();
  if (!phone) return { text: "I haven't listed a phone number publicly, but email works great too!" };
  return { text: `You can reach me at ${phone}.` };
}

export function buildResumeResponse(): AssistantEngineResponse {
  const url = getResumeUrl();
  if (!url) return { text: "My resume isn't linked yet, but feel free to ask about my skills or projects instead." };
  return { text: "You can view or download my resume here:", links: [{ label: "View Resume", url }] };
}

export function buildLocationResponse(): AssistantEngineResponse {
  const location = getLocation();
  if (!location) return { text: "I haven't listed my location publicly, but feel free to reach out over email." };
  return { text: `I'm based in ${location}.` };
}

const SOCIAL_LABELS: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  messenger: "Messenger",
  twitter: "Twitter",
};

export function buildSocialResponse(platformId: string): AssistantEngineResponse {
  const link = findSocialLink(platformId);
  const label = SOCIAL_LABELS[platformId] ?? platformId;
  if (!link) return { text: `I don't have a ${label} link listed yet.` };
  return { text: `Here's my ${label}:`, links: [{ label, url: link.url }] };
}

/* ---------------------------------------------------------------------- */
/* Projects                                                                */
/* ---------------------------------------------------------------------- */

function projectLinks(project: ProjectRecord): ChatLink[] {
  const links: ChatLink[] = [];
  const github = getProjectGithubUrl(project);
  const report = getProjectReportUrl(project);
  const demo = getProjectDemoUrl(project);
  if (github) links.push({ label: "GitHub", url: github });
  if (report) links.push({ label: "Report", url: report });
  if (demo) links.push({ label: "Live Demo", url: demo });
  return links;
}

/** Full, rich project card — only the fields that actually exist are shown. */
export function buildProjectResponse(project: ProjectRecord, followUp?: ProjectFollowUp | null): AssistantEngineResponse {
  if (followUp) return buildProjectFollowUpResponse(project, followUp);

  const lines: string[] = [project.title];

  const overview = getProjectOverview(project);
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

export function buildProjectFollowUpResponse(project: ProjectRecord, followUp: ProjectFollowUp): AssistantEngineResponse {
  switch (followUp) {
    case "overview":
      return buildProjectResponse(project);

    case "features":
      return project.features?.length
        ? { text: `Key features of ${project.title}: ${formatList(project.features)}.` }
        : { text: `I don't have a detailed feature list for ${project.title} yet.` };

    case "technologies":
      return project.technologies?.length
        ? { text: `${project.title} was built using ${formatList(project.technologies)}.` }
        : { text: `I don't have a technology list recorded for ${project.title} yet.` };

    case "github": {
      const url = getProjectGithubUrl(project);
      return url
        ? { text: `Here's the GitHub repository for ${project.title}:`, links: [{ label: "GitHub", url }] }
        : { text: `${project.title} doesn't have a public GitHub link available right now.` };
    }

    case "report": {
      const url = getProjectReportUrl(project);
      return url
        ? { text: `Here's the report for ${project.title}:`, links: [{ label: "Report", url }] }
        : { text: `I don't have a report or write-up published for ${project.title} yet.` };
    }

    case "demo": {
      const url = getProjectDemoUrl(project);
      return url
        ? { text: `Here's the live demo for ${project.title}:`, links: [{ label: "Live Demo", url }] }
        : { text: `${project.title} doesn't have a live demo available right now.` };
    }

    case "year":
      return project.year
        ? { text: `${project.title} was worked on in ${project.year}.` }
        : { text: `I don't have a specific year recorded for ${project.title}.` };

    case "role":
    case "builder":
      return project.role
        ? { text: `My role on ${project.title} was: ${project.role}.` }
        : { text: `I built ${project.title} myself as part of my portfolio.` };

    case "status":
      return project.status
        ? { text: `${project.title} is currently: ${project.status}.` }
        : { text: `I don't have a status recorded for ${project.title}.` };

    case "category":
      return project.category
        ? { text: `${project.title} falls under the ${project.category} category.` }
        : { text: `I don't have a category tag recorded for ${project.title}.` };
  }
}

export function buildProjectListResponse(): AssistantEngineResponse {
  const titles = getAllProjects().map((p) => p.title);
  if (titles.length === 0) return { text: "I don't have any projects listed yet." };
  return { text: `I've worked on a few projects: ${formatList(titles)}. Which one would you like to hear about?` };
}

export function buildFollowUpAmbiguousResponse(followUp: ProjectFollowUp): AssistantEngineResponse {
  const label = followUp.charAt(0).toUpperCase() + followUp.slice(1);
  return { text: `Which project's ${label} would you like? I've worked on: ${formatList(getAllProjects().map((p) => p.title))}.` };
}

export function buildGithubScopeClarification(): AssistantEngineResponse {
  return { text: "Do you mean my GitHub profile, or one of my project repositories?" };
}

export function buildGithubProjectPickPrompt(): AssistantEngineResponse {
  return { text: `Sure — which project's GitHub would you like? I've worked on: ${formatList(getAllProjects().map((p) => p.title))}.` };
}