export function reason(agent, task) {
  return { agent: agent.id, task, decision: "proceed" };
}
