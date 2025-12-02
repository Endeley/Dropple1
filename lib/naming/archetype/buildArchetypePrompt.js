export function buildArchetypePrompt({ brand, industry, personality } = {}) {
  return `
You are Dropple's Brand Archetype Engine.

Assign the most accurate brand archetype(s).

Brand: ${brand}
Industry: ${industry}
Personality: ${personality}

Return JSON ONLY:

{
  "primary_archetype": {},
  "secondary_archetype": {},
  "tertiary_archetype": {},
  "brand_drivers": [],
  "emotional_triggers": [],
  "voice": {
    "tone": "",
    "patterns": [],
    "do": [],
    "dont": []
  },
  "visual_alignment": {
    "colors": [],
    "shapes": [],
    "textures": [],
    "motion": []
  },
  "story_themes": [],
  "taglines": [],
  "archetype_summary": ""
}

Rules:
- Choose from 12 archetypes: Creator, Magician, Sage, Hero, Explorer, Innocent, Lover, Jester, Ruler, Everyman, Caregiver, Rebel.
- Output must match emotional + visual identity.
- Taglines: 5–10 options.
- Emotional triggers: 5–10.
`.trim();
}
