export function createSubscription({ userId, plan = "free" }) {
  return {
    id: `sub_${Math.random().toString(36).slice(2, 8)}`,
    userId,
    plan,
    status: "active",
    startedAt: Date.now(),
    renewsAt: Date.now() + 30 * 24 * 3600 * 1000,
  };
}

export function changePlan(sub, plan) {
  return { ...sub, plan, updatedAt: Date.now() };
}

export function cancel(sub) {
  return { ...sub, status: "canceled", canceledAt: Date.now() };
}
