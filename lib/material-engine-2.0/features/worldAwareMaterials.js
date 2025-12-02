export function applyWorldAwareness(material, world = {}) {
  material.worldContext = world;
  return material;
}
