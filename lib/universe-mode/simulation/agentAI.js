export function runAgents(world = {}) {
  return { worldId: world.id || "unknown", agents: (world.population || []).length };
}
