const memories = new Map();

export function addAgentMemory(agentId, entry) {
  if (!memories.has(agentId)) memories.set(agentId, []);
  memories.get(agentId).push({ entry, ts: Date.now() });
}

export function getAgentMemories(agentId) {
  return memories.get(agentId) || [];
}
