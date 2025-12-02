export function normalizeSlogan(data = {}) {
  const clean = (arr) =>
    [...new Set((arr || []).map((x) => (x == null ? "" : `${x}`.trim())).filter(Boolean))].slice(0, 30);

  return {
    hero: clean(data.hero),
    short: clean(data.short),
    cta: clean(data.cta),
    marketing: clean(data.marketing),
    value_based: clean(data.value_based),
  };
}
