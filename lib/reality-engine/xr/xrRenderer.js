export function renderXR(scene = {}) {
  return { rendered: true, nodes: Object.keys(scene).length };
}
