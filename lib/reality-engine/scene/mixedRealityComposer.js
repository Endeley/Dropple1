export function composeMixedReality({ real = {}, virtual = {} } = {}) {
  return { composed: true, realLayers: Object.keys(real).length, virtualLayers: Object.keys(virtual).length };
}
