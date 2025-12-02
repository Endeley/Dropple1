const agents = new Map();

export function createAgent(name, type = "generic", persona = {}) {
  const agent = { id: `agent_${Math.random().toString(36).slice(2, 8)}`, name, type, persona, state: {} };
  agents.set(agent.id, agent);
  return agent;
}

export function listAgents() {
  return Array.from(agents.values());
}

export function updateAgentState(id, patch = {}) {
  const agent = agents.get(id);
  if (!agent) return null;
  agent.state = { ...agent.state, ...patch };
  return agent;
}
