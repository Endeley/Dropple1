export function generateTemplates({ brand = "Default", count = 5 } = {}) {
  return Array.from({ length: count }).map((_, i) => ({
    id: `tmpl_${i}`,
    brand,
    layout: "grid",
  }));
}
