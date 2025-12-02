export function buildTemplateThemePrompt({ brand, visual_style, archetype, concept_art, categories } = {}) {
  return `
You are Dropple's Template Theme Generator.

Generate complete template theme packs.

Brand: ${brand}
Visual Style: ${visual_style}
Archetype: ${archetype}
Concept Art: ${concept_art}
Categories: ${categories}

Return JSON ONLY:

{
  "theme_name": "",
  "theme_variants": [],
  "template_categories": {},
  "template_examples": [],
  "shape_language": [],
  "animation_hooks": [],
  "color_usage_rules": [],
  "type_usage_rules": [],
  "special_effects": [],
  "naming_scheme": [],
  "export_pack": {}
}

Rules:
- Theme name must be original, creative, and aesthetic.
- Theme variants: 3–7 styles.
- Template categories: social, marketing, branding, creative, corporate, UI, animation.
- For each category, include 3–6 templates.
- Shape language must match concept art.
- Animation hooks must be reusable.
- Naming scheme: 10–20 template names.
- Export pack must include structure info.
`.trim();
}
