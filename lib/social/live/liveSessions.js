const sessions = [];

export function startSession(hostId, topic = "live") {
  const id = `live_${Math.random().toString(36).slice(2, 8)}`;
  sessions.push({ id, hostId, topic, startedAt: Date.now() });
  return id;
}

export function listSessions() {
  return sessions;
}
