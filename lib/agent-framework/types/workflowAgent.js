export function workflowAgentTask(task) {
  return { agent: "workflow", task, result: "workflow_executed" };
}
