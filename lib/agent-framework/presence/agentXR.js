export function agentXR(agent, sessionId) {
  return { agent: agent.id, sessionId, xr: true };
}
