import { getAgent } from "./registry";
import { tools } from "@/lib/agent/tools";

export async function runAgent(agentId, message) {
  const agent = getAgent(agentId);
  if (!agent) throw new Error(`Agent not found: ${agentId}`);
  return agent.onMessage(message, tools);
}
