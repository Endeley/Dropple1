export function buildStyleEmbedding(vec = []) {
  return { dim: vec.length || 128, vector: vec.length ? vec : Array(128).fill(0) };
}
