export function broadcastPresence(identity, sessionId) {
  return { user: identity.userId, sessionId, broadcast: true };
}
