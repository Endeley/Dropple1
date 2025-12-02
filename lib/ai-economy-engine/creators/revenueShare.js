export function computeRevenueShare(amount = 0, roles = []) {
  const equal = Number((amount / Math.max(1, roles.length)).toFixed(2));
  return roles.map((r) => ({ role: r, share: equal }));
}
