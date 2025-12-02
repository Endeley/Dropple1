export function styleWorld(world = {}, style = {}) {
  return { worldId: world.id || "world", style };
}
