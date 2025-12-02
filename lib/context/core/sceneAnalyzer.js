export function analyzeScene({ layers = [], selection = [] } = {}) {
  const typeCount = layers.reduce((acc, layer) => {
    const key = layer.type || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const dominantType =
    Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  return {
    layerCount: layers.length,
    selectionCount: selection.length,
    dominantType,
    has3D: layers.some((l) => l.type === "3d"),
    complexityScore: Number(((layers.length + selection.length * 0.5) / 10).toFixed(2)),
  };
}
