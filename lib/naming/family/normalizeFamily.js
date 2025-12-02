export function normalizeFamily(data = {}) {
  const clean = (arr) =>
    [...new Set((arr || []).map((x) => (x == null ? "" : `${x}`.trim())).filter(Boolean))].slice(0, 20);

  return {
    base_names: clean(data.base_names),
    series: clean(data.series),
    variants: clean(data.variants),
    editions: clean(data.editions),
    short_codes: clean(data.short_codes),
    ui_versions: clean(data.ui_versions),
  };
}
