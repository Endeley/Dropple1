export function distributeFund(pool = 1000, creators = []) {
  const each = Number((pool / Math.max(1, creators.length)).toFixed(2));
  return creators.map((c) => ({ creatorId: c, amount: each }));
}
