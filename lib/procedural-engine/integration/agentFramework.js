export function assignProceduralTask(agentId, task = "generate") {
  return { agentId, task, status: "assigned" };
}
