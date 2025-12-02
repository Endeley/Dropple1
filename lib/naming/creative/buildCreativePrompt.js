export function buildCreativePrompt({ brand, archetype, tone, medium, personality } = {}) {
  return `
You are Dropple's Creative Direction Engine.

Create a complete art direction blueprint.

Brand: ${brand}
Archetype: ${archetype}
Tone: ${tone}
Medium: ${medium}
Brand Personality: ${personality}

Return JSON ONLY:

{
  "master_concept": "",
  "mood_themes": [],
  "color_environment": [],
  "lighting_rules": [],
  "composition_rules": [],
  "motion_direction": {
    "micro": [],
    "macro": [],
    "loops": []
  },
  "photography_style": [],
  "illustration_style": [],
  "symbolism": [],
  "do": [],
  "dont": [],
  "campaign_concepts": [],
  "art_direction_summary": ""
}

Rules:
- Master concept: 1 strong sentence.
- Mood themes: 3–6 themes.
- Colors: NOT the palette — describe mood of colors.
- Lighting: cinematic style.
- Composition: photographic + UI.
- Motion: micro, macro, loops.
- Photography: subject + lighting + mood.
- Illustration: shape + depth + style.
- Symbolism: 5–8 metaphors.
- Campaign concepts: 2–5.
`.trim();
}
