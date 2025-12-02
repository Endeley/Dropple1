export function fuseInputs(inputs = {}) {
  const keys = Object.keys(inputs);
  return { fused: true, keys, confidence: Math.min(1, keys.length / 5) };
}
