export function createPlan({ goal = "tell story", steps = [] } = {}) {
  return {
    id: `plan_${Math.random().toString(36).slice(2, 8)}`,
    goal,
    steps,
  };
}

export function addStep(plan, step) {
  return { ...plan, steps: [...plan.steps, step] };
}
