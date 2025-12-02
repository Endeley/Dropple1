export function runAutomationAsAgent(agentId, workflow = []) {
  return { agentId, workflow: workflow.length, status: "started" };
}
