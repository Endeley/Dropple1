export function addAgentToSession(agentId, sessionId) {
  return { agentId, sessionId, joined: true };
}
