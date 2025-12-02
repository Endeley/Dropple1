export function reasonOverPlan(plan = []) {
  return {
    plan,
    issues: plan.length ? [] : ["Empty plan"],
    confidence: plan.length ? 0.8 : 0.2,
  };
}
