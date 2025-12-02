export function feedAgentPlan(agentId, plan = []) {
  return { agentId, steps: plan.length };
}
