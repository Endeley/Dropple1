export function useTool(agent, tool, payload = {}) {
  return { agent: agent.id, tool, payload, status: "used" };
}
