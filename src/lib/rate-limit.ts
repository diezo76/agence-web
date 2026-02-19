/**
 * Rate limiting en mémoire (simple, pour une seule instance)
 * Pour production multi-instance, utiliser Redis ou Upstash
 */

const store = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export function rateLimit(identifier: string): { success: boolean; remaining: number } {
  const now = Date.now();
  const record = store.get(identifier);

  if (!record) {
    store.set(identifier, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
    return { success: true, remaining: MAX_REQUESTS - 1 };
  }

  if (now > record.resetAt) {
    store.set(identifier, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
    return { success: true, remaining: MAX_REQUESTS - 1 };
  }

  record.count++;
  if (record.count > MAX_REQUESTS) {
    return { success: false, remaining: 0 };
  }

  return { success: true, remaining: MAX_REQUESTS - record.count };
}

function cleanup() {
  const now = Date.now();
  for (const [key, value] of store.entries()) {
    if (now > value.resetAt) store.delete(key);
  }
}
setInterval(cleanup, 60 * 1000);
