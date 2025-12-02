export function encodeAesthetic(features = {}) {
  return {
    vector: Array(16).fill(0.2),
    features,
  };
}
