export function createWorkflow(name, steps = []) {
  return {
    id: `wf_${Math.random().toString(36).slice(2, 8)}`,
    name,
    steps,
  };
}

export function addStep(workflow, step) {
  workflow.steps.push(step);
  return workflow;
}
