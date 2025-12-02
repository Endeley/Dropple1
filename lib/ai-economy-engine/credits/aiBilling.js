export function billAIUsage(userId, model = "default", cost = 1) {
  return { userId, model, cost, billedAt: Date.now() };
}
