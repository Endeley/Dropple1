export function normalizeUIKit(data = {}) {
  return {
    component_categories: data.component_categories || {},
    components: Array.isArray(data.components) ? data.components : [],
    tokens_used: data.tokens_used || {},
    component_examples: Array.isArray(data.component_examples) ? data.component_examples : [],
    design_rules: Array.isArray(data.design_rules) ? data.design_rules : [],
    code_export: data.code_export || {},
  };
}
