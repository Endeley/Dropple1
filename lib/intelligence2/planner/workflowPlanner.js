export function planWorkflow(tasks = []) {
  return tasks.map((t, i) => ({
    id: `step_${i}`,
    action: t,
    status: "pending",
  }));
}
