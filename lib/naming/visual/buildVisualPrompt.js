export function buildVisualPrompt({ brand, industry, personality, color_type } = {}) {
  return `
You are Dropple’s Visual Style Language Engine.

Create a complete visual identity system.

Brand: ${brand}
Industry: ${industry}
Personality: ${personality}
Color Type: ${color_type}

Return JSON ONLY:

{
  "colors": {
    "primary": [],
    "secondary": [],
    "neutrals": [],
    "gradients": [],
    "semantics": {}
  },
  "typography": {
    "display": {},
    "body": {},
    "mono": {},
    "scale": {}
  },
  "shapes": {
    "radius_scale": [],
    "motifs": [],
    "buttons": "",
    "strokes": ""
  },
  "icons": {
    "style": "",
    "stroke_width": "",
    "corner_radius": "",
    "filled_variants": ""
  },
  "grid": {
    "spacing_scale": [],
    "grid_system": ""
  },
  "elevation": {
    "shadows": [],
    "levels": []
  },
  "motion": {
    "principles": [],
    "hover": [],
    "transitions": []
  },
  "imagery": {
    "photo_style": [],
    "illustration_style": [],
    "textures": []
  },
  "logo_rules": {
    "clearspace": "",
    "minimum_size": "",
    "usage": []
  },
  "export_tokens": {}
}

Rules:
- Colors: 3–6 primary, 3–6 secondary, 3–5 neutrals.
- Typography: Headings + body + mono.
- Shapes: Radii + motifs.
- Icons: Style, stroke width, corner radius.
- Grid: spacing scale + columns.
- Motion: interaction + transitions + animations.
- Imagery: photography + illustrations + 3D.
- Logo rules: usage guidelines.
`.trim();
}
