const usage = [];

export function trackUsage(userId, type, amount) {
  usage.push({ userId, type, amount, ts: Date.now() });
}

export function listUsage(userId) {
  return usage.filter((u) => u.userId === userId);
}
