export function generateCity({ density = 1 } = {}) {
  return { blocks: Math.max(1, Math.floor(density * 10)), roads: [], style: "modern" };
}
