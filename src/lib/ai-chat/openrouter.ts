import "server-only";

type OpenRouterMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type OpenRouterChoice = {
  message?: {
    content?: string;
  };
};

type OpenRouterResponse = {
  choices?: OpenRouterChoice[];
  error?: {
    message?: string;
  };
};

const DEFAULT_MODEL = "qwen/qwen3-235b-a22b-instruct-2507";
const DEFAULT_TIMEOUT_MS = 20_000;

export function getOpenRouterConfig() {
  return {
    apiKey: process.env.OPENROUTER_API_KEY,
    model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
    timeoutMs: parseNumber(process.env.OPENROUTER_TIMEOUT_MS, DEFAULT_TIMEOUT_MS),
  };
}

export async function callOpenRouter(messages: OpenRouterMessage[]) {
  const config = getOpenRouterConfig();
  if (!config.apiKey) {
    throw new OpenRouterConfigError("OPENROUTER_API_KEY is not configured.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://healthy-happy.local",
        "X-Title": "Healthy & Happy AI Chat",
      },
      body: JSON.stringify({
        model: config.model,
        messages,
        temperature: 0.45,
        max_tokens: 700,
      }),
      signal: controller.signal,
    });

    const data = (await response.json().catch(() => ({}))) as OpenRouterResponse;
    if (!response.ok) {
      throw new OpenRouterProviderError(data.error?.message ?? `OpenRouter returned ${response.status}`);
    }

    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) {
      throw new OpenRouterProviderError("OpenRouter returned an empty response.");
    }

    return content;
  } catch (error) {
    if (error instanceof OpenRouterConfigError || error instanceof OpenRouterProviderError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new OpenRouterProviderError("OpenRouter request timed out.");
    }
    throw new OpenRouterProviderError("OpenRouter request failed.");
  } finally {
    clearTimeout(timeout);
  }
}

export class OpenRouterConfigError extends Error {}
export class OpenRouterProviderError extends Error {}

function parseNumber(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
