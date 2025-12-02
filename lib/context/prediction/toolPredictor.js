export function predictTool({ recentActions = [], selection = [] } = {}) {
  const last = recentActions.at(-1);
  if (selection.length > 1) return "align";
  if (last?.meta?.tool === "text") return "colorPicker";
  if (last?.meta?.tool === "image") return "mask";
  return "select";
}
