const presence = new Map();

export function setPresence(userId, payload) {
  presence.set(userId, { userId, ...payload, updatedAt: Date.now() });
  return Array.from(presence.values());
}

export function listPresence() {
  return Array.from(presence.values());
}
