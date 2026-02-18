/**
 * Simple in-memory idempotency store with TTL.
 * Prevents duplicate processing of the same WhatsApp message ID.
 * Note: resets on serverless cold starts — acceptable for dedup within a single instance lifetime.
 */

const store = new Map<string, number>();

const DEFAULT_TTL_MS = 10 * 60 * 1000; // 10 minutes

export function hasProcessed(messageId: string): boolean {
  const expiry = store.get(messageId);
  if (expiry === undefined) return false;
  if (Date.now() > expiry) {
    store.delete(messageId);
    return false;
  }
  return true;
}

export function markProcessed(messageId: string, ttlMs = DEFAULT_TTL_MS): void {
  store.set(messageId, Date.now() + ttlMs);

  // Lazy cleanup: prune expired entries when store grows large
  if (store.size > 5000) {
    const now = Date.now();
    for (const [key, expiry] of store) {
      if (now > expiry) store.delete(key);
    }
  }
}
