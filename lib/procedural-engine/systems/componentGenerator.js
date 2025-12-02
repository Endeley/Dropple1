export function generateComponents(count = 3) {
  return Array.from({ length: count }).map((_, i) => ({ id: `comp_${i}`, type: "card" }));
}
