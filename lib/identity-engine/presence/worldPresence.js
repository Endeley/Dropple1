export function setWorldPresence(worldId, userId, role = "visitor") {
  return { worldId, userId, role, ts: Date.now() };
}
