export function normalizeTemplateTheme(data = {}) {
  return {
    theme_name: data.theme_name || "",
    theme_variants: Array.isArray(data.theme_variants) ? data.theme_variants : [],
    template_categories: data.template_categories || {},
    template_examples: Array.isArray(data.template_examples) ? data.template_examples : [],
    shape_language: Array.isArray(data.shape_language) ? data.shape_language : [],
    animation_hooks: Array.isArray(data.animation_hooks) ? data.animation_hooks : [],
    color_usage_rules: Array.isArray(data.color_usage_rules) ? data.color_usage_rules : [],
    type_usage_rules: Array.isArray(data.type_usage_rules) ? data.type_usage_rules : [],
    special_effects: Array.isArray(data.special_effects) ? data.special_effects : [],
    naming_scheme: Array.isArray(data.naming_scheme) ? data.naming_scheme : [],
    export_pack: data.export_pack || {},
  };
}
