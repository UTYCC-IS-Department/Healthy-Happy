import { NextRequest } from "next/server";
import { hasLocale } from "@/i18n/config";
import { callOpenRouter, OpenRouterConfigError } from "@/lib/ai-chat/openrouter";
import { buildChatMessages, getNotGroundedAnswer } from "@/lib/ai-chat/prompts";
import { isRateLimited } from "@/lib/ai-chat/rate-limit";
import { hasStrongContext, retrieveProjectContext } from "@/lib/ai-chat/retrieval";
import type { ChatErrorCode, ChatResponse } from "@/lib/ai-chat/types";

export const runtime = "nodejs";

const DEFAULT_MAX_MESSAGE_LENGTH = 1200;

export async function POST(request: NextRequest) {
  const body = await readBody(request);
  if (!body) return jsonFailure("invalid_request", "Invalid request.", 400);

  const locale = typeof body.locale === "string" && hasLocale(body.locale) ? body.locale : null;
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!locale || !message) return jsonFailure("invalid_request", "Invalid request.", 400);

  const maxLength = parseNumber(process.env.AI_CHAT_MAX_MESSAGE_LENGTH, DEFAULT_MAX_MESSAGE_LENGTH);
  if (message.length > maxLength) return jsonFailure("too_long", "Message is too long.", 400);

  const rateLimitKey = getRateLimitKey(request);
  if (isRateLimited(rateLimitKey)) return jsonFailure("rate_limited", "Rate limit exceeded.", 429);

  const retrieved = retrieveProjectContext(message, locale);
  if (!hasStrongContext(retrieved)) {
    return Response.json({
      ok: true,
      answer: getNotGroundedAnswer(locale),
      sources: [],
      grounded: false,
    } satisfies ChatResponse);
  }

  try {
    const answer = await callOpenRouter(buildChatMessages({ locale, userMessage: message, chunks: retrieved }));
    return Response.json({
      ok: true,
      answer,
      grounded: true,
      sources: retrieved.map((chunk) => ({
        id: chunk.id,
        title: chunk.title,
        sourcePath: chunk.sourcePath,
        sectionId: chunk.sectionId,
        contentType: chunk.contentType,
      })),
    } satisfies ChatResponse);
  } catch (error) {
    const message = error instanceof OpenRouterConfigError ? "OpenRouter is not configured." : "OpenRouter is unavailable.";
    return jsonFailure("unavailable", message, 503);
  }
}

async function readBody(request: NextRequest): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json();
    return body && typeof body === "object" && !Array.isArray(body) ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

function jsonFailure(code: ChatErrorCode, message: string, status: number) {
  return Response.json({ ok: false, code, message } satisfies ChatResponse, { status });
}

function getRateLimitKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || request.headers.get("x-real-ip") || "anonymous";
}

function parseNumber(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
