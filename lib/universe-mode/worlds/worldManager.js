const worlds = [];

export function createWorld(name = "World") {
  const world = { id: `world_${Math.random().toString(36).slice(2, 8)}`, name, state: {}, climate: {}, population: [] };
  worlds.push(world);
  return world;
}

export function listWorlds() {
  return worlds;
}
