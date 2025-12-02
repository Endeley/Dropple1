export function runtimeUpdate(material, params = {}) {
  material.runtime = { ...params };
  return material;
}
