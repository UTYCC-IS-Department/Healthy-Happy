import "server-only";

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function isRateLimited(key: string) {
  const windowMs = parseNumber(process.env.AI_CHAT_RATE_LIMIT_WINDOW_MS, 60_000);
  const max = parseNumber(process.env.AI_CHAT_RATE_LIMIT_MAX, 8);
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (current.count >= max) return true;
  current.count += 1;
  return false;
}

function parseNumber(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
