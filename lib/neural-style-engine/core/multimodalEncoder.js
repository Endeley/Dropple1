export function encodeMultimodal(inputs = {}) {
  const keys = Object.keys(inputs);
  return { fused: true, keys, embedding: Array(32).fill(0.05) };
}
