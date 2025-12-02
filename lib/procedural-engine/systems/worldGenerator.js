export function generateWorld({ theme = "generic" } = {}) {
  return { id: `world_${Math.random().toString(36).slice(2, 8)}`, theme, biomes: [], props: [] };
}
