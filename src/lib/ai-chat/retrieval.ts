import "server-only";
import corpus from "@/generated/ai-corpus.json";
import type { Locale } from "@/i18n/config";
import type { AiCorpusChunk, RetrievedChunk } from "./types";

const MIN_SCORE = 4;
const MAX_RESULTS = 6;
const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "can",
  "for",
  "from",
  "how",
  "is",
  "it",
  "of",
  "or",
  "the",
  "to",
  "what",
  "where",
  "which",
  "with",
  "you",
  "your",
]);

const allChunks = corpus.chunks as AiCorpusChunk[];

export function getCorpusChunks(locale: Locale): AiCorpusChunk[] {
  const selected = allChunks.filter((chunk) => chunk.locale === locale);
  if (locale === "en") return selected;
  return [...selected, ...allChunks.filter((chunk) => chunk.locale === "en" && chunk.contentType === "site-data")];
}

export function retrieveProjectContext(message: string, locale: Locale, limit = MAX_RESULTS): RetrievedChunk[] {
  const queryTokens = tokenize(message);
  if (queryTokens.length === 0) return [];

  return getCorpusChunks(locale)
    .map((chunk) => ({ ...chunk, score: scoreChunk(chunk, queryTokens, message) }))
    .filter((chunk) => chunk.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, limit);
}

export function hasStrongContext(chunks: RetrievedChunk[]): boolean {
  return chunks.length > 0 && chunks[0].score >= MIN_SCORE;
}

export function formatRetrievedContext(chunks: RetrievedChunk[]): string {
  return chunks
    .map(
      (chunk, index) =>
        `<source index="${index + 1}" id="${chunk.id}" locale="${chunk.locale}" path="${chunk.sourcePath}" section="${chunk.sectionId}">\n${chunk.text}\n</source>`,
    )
    .join("\n\n");
}

function scoreChunk(chunk: AiCorpusChunk, queryTokens: string[], rawMessage: string): number {
  const searchable = `${chunk.title}\n${chunk.text}`.toLocaleLowerCase();
  const chunkTokens = new Set(tokenize(searchable));
  let score = 0;

  for (const token of queryTokens) {
    if (chunkTokens.has(token)) score += token.length > 3 ? 3 : 2;
    else if (token.length >= 4 && searchable.includes(token)) score += 2;
  }

  const normalizedMessage = rawMessage.trim().toLocaleLowerCase();
  if (normalizedMessage.length >= 4 && searchable.includes(normalizedMessage)) score += 8;
  if (chunk.contentType === "product") score += 1;
  return score;
}

function tokenize(value: string): string[] {
  const normalized = value
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .trim();
  const tokens = normalized.match(/[\p{L}\p{N}]+/gu) ?? [];
  const burmeseBigrams = Array.from(normalized.matchAll(/[\u1000-\u109F]{2,}/g)).flatMap(([word]) =>
    Array.from({ length: Math.max(0, word.length - 1) }, (_, index) => word.slice(index, index + 2)),
  );
  return Array.from(new Set([...tokens, ...burmeseBigrams].filter((token) => token.length > 1 && !STOP_WORDS.has(token))));
}
