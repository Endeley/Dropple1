export function spawnVRPanel(title = "Panel") {
  return { id: `vrp_${Math.random().toString(36).slice(2, 8)}`, title, pos: [0, 1.2, -1] };
}
