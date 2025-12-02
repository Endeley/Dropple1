export function syncUniverseStory(universe, storyNodes = []) {
  return { universeId: universe.id, nodes: storyNodes.length };
}
