export function splitRoyalties(amount = 0, chain = []) {
  const shares = chain.map(() => Number((amount / chain.length).toFixed(2)));
  return { shares, total: shares.reduce((a, b) => a + b, 0) };
}
