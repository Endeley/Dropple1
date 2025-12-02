export function tierFor(stats = {}) {
  const sales = stats.sales || 0;
  if (sales > 1000) return "Diamond";
  if (sales > 500) return "Platinum";
  if (sales > 200) return "Gold";
  if (sales > 50) return "Silver";
  return "Bronze";
}
