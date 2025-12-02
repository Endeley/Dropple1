export function syncSharedWorld(state = {}) {
  return { synced: true, world: state.id || "world" };
}
