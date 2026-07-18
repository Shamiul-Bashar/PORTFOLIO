/**
 * lib/ai/nlp-utils.ts
 *
 * Low-level text-processing primitives used by the intent classifier.
 * No knowledge-of-portfolio-data lives here — this file only knows about
 * strings.
 */

/** Lowercases, strips punctuation, collapses whitespace. */
export function normalizeInput(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/[_]+/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(input: string): string[] {
  return input.split(" ").filter(Boolean);
}

export function tightenSpaces(input: string): string {
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
export function isCloseMatch(word: string, target: string): boolean {
  if (word === target) return true;

  const sw = singularize(word);
  const st = singularize(target);
  if (sw === st) return true;

  if (Math.abs(sw.length - st.length) <= typoThreshold(st) && levenshtein(sw, st) <= typoThreshold(st)) return true;
  return Math.abs(word.length - target.length) <= typoThreshold(target) && levenshtein(word, target) <= typoThreshold(target);
}

/** True if a single word/phrase is present in the input (exact, tight, or fuzzy). */
export function containsPhrase(input: string, phrase: string): boolean {
  const cleanPhrase = normalizeInput(phrase);
  if (!cleanPhrase) return false;

  if (input.includes(cleanPhrase)) return true;
  if (tightenSpaces(input).includes(tightenSpaces(cleanPhrase))) return true;

  const phraseWords = tokenize(cleanPhrase);
  const inputWords = tokenize(input);

  if (phraseWords.length === 1) {
    return inputWords.some((word) => isCloseMatch(word, phraseWords[0]));
  }

  // Multi-word phrases: every phrase word must appear somewhere in the
  // input, in any order — "hydro smart" still matches "smart hydro".
  return phraseWords.every((pw) => inputWords.some((word) => isCloseMatch(word, pw)));
}

export function matchesAny(input: string, phrases: string[]): boolean {
  return phrases.some((phrase) => containsPhrase(input, phrase));
}

export function isShortUtterance(input: string, maxWords = 3): boolean {
  return tokenize(input).length <= maxWords;
}

export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Picks a random item from `items`, avoiding the index used last time,
 * so the same reply never fires twice in a row.
 */
export function pickRandomWithoutRepeat<T>(items: T[], lastIndexRef: { current: number | null }): T {
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

export function formatList(items: (string | undefined | null)[] | undefined, conjunction: "and" | "or" = "and"): string {
  const clean = (items ?? []).filter((x): x is string => Boolean(x));
  if (clean.length === 0) return "";
  if (clean.length === 1) return clean[0];
  if (clean.length === 2) return `${clean[0]} ${conjunction} ${clean[1]}`;
  return `${clean.slice(0, -1).join(", ")}, ${conjunction} ${clean[clean.length - 1]}`;
}

/**
 * Specificity-weighted score for how well a set of trigger phrases matches
 * the input. Longer/more specific phrases contribute quadratically more
 * than single generic words, so "show me your projects" clearly outweighs
 * a bare "about" when both loosely apply.
 */
export function scorePhrases(input: string, phrases: string[]): number {
  let score = 0;
  for (const phrase of phrases) {
    if (containsPhrase(input, phrase)) {
      const words = tokenize(normalizeInput(phrase)).length;
      score += words * words;
    }
  }
  return score;
}