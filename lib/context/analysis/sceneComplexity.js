export function computeSceneComplexity({ layers = [], selection = [] } = {}) {
  const weight = layers.length + selection.length * 2;
  if (weight < 10) return "low";
  if (weight < 40) return "medium";
  return "high";
}
