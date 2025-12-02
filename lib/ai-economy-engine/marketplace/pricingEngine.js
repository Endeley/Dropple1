export function priceAsset(base = 10, demand = 1) {
  return Number((base * demand).toFixed(2));
}
