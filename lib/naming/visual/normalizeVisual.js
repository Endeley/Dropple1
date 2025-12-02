export function normalizeVisual(data = {}) {
  return {
    colors: data.colors || {},
    typography: data.typography || {},
    shapes: data.shapes || {},
    icons: data.icons || {},
    grid: data.grid || {},
    elevation: data.elevation || {},
    motion: data.motion || {},
    imagery: data.imagery || {},
    logo_rules: data.logo_rules || {},
    export_tokens: data.export_tokens || {},
  };
}
