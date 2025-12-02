export function applyBrandingContext(brand, suggestions = []) {
  if (!brand) return suggestions;
  return suggestions.map((s) => `${s} (brand: ${brand})`);
}
