export function normalizeAdVariants(data = {}) {
  return {
    primary_text: Array.isArray(data.primary_text) ? data.primary_text : [],
    headlines: Array.isArray(data.headlines) ? data.headlines : [],
    descriptions: Array.isArray(data.descriptions) ? data.descriptions : [],
    hooks: Array.isArray(data.hooks) ? data.hooks : [],
    cta: Array.isArray(data.cta) ? data.cta : [],
    script_variants: Array.isArray(data.script_variants) ? data.script_variants : [],
  };
}
