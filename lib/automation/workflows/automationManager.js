const workflows = [];

export function saveWorkflow(workflow) {
  workflows.push(workflow);
  return workflow.id;
}

export function listWorkflows() {
  return workflows;
}

export function runWorkflow(id, context = {}) {
  const wf = workflows.find((w) => w.id === id);
  if (!wf) return { ok: false, error: "Not found" };
  const results = wf.steps.map((step) => ({
    step: step.action || "unknown",
    status: "done",
    ctx: context,
  }));
  return { ok: true, results };
}
