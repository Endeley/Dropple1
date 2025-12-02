const presence = new Map();

export function updatePresence(userId, data = {}) {
  presence.set(userId, { ...data, ts: Date.now() });
}

export function getPresence() {
  return Array.from(presence.entries()).map(([id, data]) => ({ id, ...data }));
}
