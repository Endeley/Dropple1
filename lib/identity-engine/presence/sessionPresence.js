const sessions = new Map();

export function setSessionPresence(sessionId, userId, data = {}) {
  if (!sessions.has(sessionId)) sessions.set(sessionId, new Map());
  sessions.get(sessionId).set(userId, { ...data, ts: Date.now() });
}

export function listSessionPresence(sessionId) {
  return Array.from(sessions.get(sessionId)?.entries() || []).map(([id, data]) => ({ id, ...data }));
}
