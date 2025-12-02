const sessions = new Map();

export function startSpatialSession(hostId) {
  const id = `spatial_${Math.random().toString(36).slice(2, 8)}`;
  sessions.set(id, { hostId, startedAt: Date.now() });
  return id;
}

export function listSpatialSessions() {
  return Array.from(sessions.entries()).map(([id, data]) => ({ id, ...data }));
}
