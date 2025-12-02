export function syncScene(state) {
  return { synced: true, nodes: (state?.layers || []).length };
}
