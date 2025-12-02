export function bindAgentMemory(agentId, memories = []) {
  return { agentId, memories: memories.length };
}
