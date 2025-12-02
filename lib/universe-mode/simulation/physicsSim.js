export function simulatePhysics(world = {}) {
  return { worldId: world.id || "unknown", physics: true };
}
