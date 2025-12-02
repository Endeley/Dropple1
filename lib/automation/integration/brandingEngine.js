export function applyBranding(layer, brand) {
  return { ...layer, brandApplied: brand || "default" };
}
