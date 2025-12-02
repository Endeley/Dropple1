export function buildUIKitPrompt({ brand, visual_style, archetype, tokens } = {}) {
  return `
You are Dropple’s UI Kit Generator.

Generate a complete UI component library.

Brand: ${brand}
Visual Style: ${visual_style}
Archetype: ${archetype}
Tokens: ${tokens}

Return JSON ONLY:

{
  "component_categories": {},
  "components": [],
  "tokens_used": {},
  "component_examples": [],
  "design_rules": [],
  "code_export": {}
}

Rules:
- Component categories must include: base, forms, layout, navigation, dashboard, AI, media.
- Components array must include 20–60 components.
- Include full states: default, hover, pressed, disabled, focus.
- Include variants: solid, outline, ghost, glow, minimal.
- Include sizes: xs, sm, md, lg.
- Include color, radius, shadows, spacing tokens.
- Must include code export scaffolding structure.
`.trim();
}
