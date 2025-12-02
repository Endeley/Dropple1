export function analyzeSales(records = []) {
  return { total: records.reduce((sum, r) => sum + (r.amount || 0), 0), count: records.length };
}
