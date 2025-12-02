export function updateWorldState(world, patch = {}) {
  world.state = { ...(world.state || {}), ...patch, updatedAt: Date.now() };
  return world;
}
