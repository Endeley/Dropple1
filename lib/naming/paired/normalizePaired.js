const cleanArray = (arr = []) => [...new Set(arr.map((v) => (v == null ? "" : `${v}`.trim())).filter(Boolean))];

export function normalizePaired(data = {}) {
  const systemsInput = Array.isArray(data) ? data : data.systems || [];

  const systems = systemsInput.map((sys) => ({
    name: sys?.name || "",
    meaning: sys?.meaning || "",
    short_slogan: sys?.short_slogan || "",
    hero_tagline: sys?.hero_tagline || "",
    cta: sys?.cta || "",
    tone: sys?.tone || "",
    variants: cleanArray(sys?.variants),
    color_themes: cleanArray(sys?.color_themes),
    brand_story: sys?.brand_story || "",
  }));

  return { systems: systems.filter((s) => s.name) };
}
