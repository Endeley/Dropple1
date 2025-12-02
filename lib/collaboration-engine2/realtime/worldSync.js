export function syncWorld(world = {}) {
  return { synced: true, worldId: world.id || "unknown" };
}
