export function analyzeSelectionPattern(history = []) {
  if (history.length === 0) return "no_selection";
  const last = history.at(-1);
  const unique = new Set(history.map((h) => h.id)).size;
  if (unique === 1 && history.length > 3) return "refining_single_layer";
  if (last?.type === "3d") return "3d_focus";
  if (unique > 5) return "broad_exploration";
  return "mixed";
}
