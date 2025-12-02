export function colorEngine(data = {}) {
  const palette = data?.colors || {};
  const primary = palette.primary?.[0] || palette.primary || "#8B5CF6";
  const background = palette.background || palette.surface || "#0b0b12";
  const text = palette.text || "#ffffff";

  return {
    primary,
    background,
    text,
    palette,
  };
}
