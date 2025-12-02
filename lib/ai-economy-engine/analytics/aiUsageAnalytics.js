export function summarizeAIUsage(usages = []) {
  return usages.reduce(
    (acc, u) => {
      acc.total += u.amount || 0;
      acc.models[u.type] = (acc.models[u.type] || 0) + (u.amount || 0);
      return acc;
    },
    { total: 0, models: {} }
  );
}
