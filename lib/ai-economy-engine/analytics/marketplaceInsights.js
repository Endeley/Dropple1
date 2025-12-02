export function marketplaceSnapshot(records = []) {
  return { items: records.length, avgPrice: records.length ? records.reduce((a, b) => a + b.price, 0) / records.length : 0 };
}
