export function sequenceNext(plan = []) {
  return plan.find((p) => p.status === "pending") || null;
}
