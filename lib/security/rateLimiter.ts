/**
 * Lightweight in-memory rate limiter.
 *
 * State lives in module scope — safe for Next.js serverless functions.
 * Cold starts naturally reset the store, which is acceptable here.
 *
 * For multi-instance or high-traffic deployments, swap this for an
 * Upstash Redis or Vercel KV backed limiter using the same interface.
 */

export interface RateLimitConfig {
  /** Unique namespace for this limiter (e.g. "leads", "login") */
  name: string;
  /** Max requests allowed per window */
  max: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

export interface RateLimitResult {
  limited: boolean;
  /** Seconds until the window resets — use for the Retry-After header */
  retryAfterSec: number;
}

interface Entry {
  count: number;
  resetAt: number;
}

const stores = new Map<string, Map<string, Entry>>();

function getStore(name: string): Map<string, Entry> {
  if (!stores.has(name)) stores.set(name, new Map());
  return stores.get(name)!;
}

/**
 * Checks and increments the rate limit for a given key.
 * @param key  Unique requester identifier — use the client IP.
 * @param cfg  Rate limit configuration.
 */
export function checkRateLimit(key: string, cfg: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const store = getStore(cfg.name);
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + cfg.windowMs });
    return { limited: false, retryAfterSec: 0 };
  }

  if (entry.count >= cfg.max) {
    return { limited: true, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { limited: false, retryAfterSec: 0 };
}

/**
 * Extracts the real client IP, preferring the x-forwarded-for header
 * set by Vercel/CDN proxies.
 */
export function getClientIp(req: import("next/server").NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "anonymous";
}
