export function createSpatialPanel(title = "Panel") {
  return { id: `panel_${Math.random().toString(36).slice(2, 8)}`, title, position: [0, 1.5, -1] };
}
