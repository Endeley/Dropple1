export function fuseReality(real = {}, virtual = {}) {
  return { fused: true, score: 0.7, realNodes: Object.keys(real).length, virtualNodes: Object.keys(virtual).length };
}
