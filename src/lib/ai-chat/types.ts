import type { Locale } from "@/i18n/config";

export type AiCorpusChunk = {
  id: string;
  locale: Locale | "en";
  sourcePath: string;
  contentType: string;
  title: string;
  sectionId: string;
  text: string;
};

export type RetrievedChunk = AiCorpusChunk & {
  score: number;
};

export type ChatSource = {
  id: string;
  title: string;
  sourcePath: string;
  sectionId: string;
  contentType: string;
};

export type ChatSuccess = {
  ok: true;
  answer: string;
  sources: ChatSource[];
  grounded: boolean;
};

export type ChatErrorCode = "invalid_request" | "too_long" | "rate_limited" | "unavailable" | "not_grounded";

export type ChatFailure = {
  ok: false;
  code: ChatErrorCode;
  message: string;
};

export type ChatResponse = ChatSuccess | ChatFailure;
