export function setXRPresence(sessionId, userId, pose = {}) {
  return { sessionId, userId, pose, ts: Date.now() };
}
