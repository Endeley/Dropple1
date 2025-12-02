export function injectWorld(universe, world) {
  universe.worlds = universe.worlds || [];
  universe.worlds.push(world.id);
  return universe;
}
