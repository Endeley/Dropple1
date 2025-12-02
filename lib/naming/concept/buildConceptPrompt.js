export function buildConceptPrompt({ brand, archetype, creative_direction, purpose } = {}) {
  return `
You are Dropple’s Concept Art & Visual Metaphor Engine.

Generate a complete conceptual art direction.

Brand: ${brand}
Archetype: ${archetype}
Creative Direction: ${creative_direction}
Purpose: ${purpose}

Return JSON ONLY:

{
  "master_metaphor": "",
  "concept_categories": [],
  "symbol_library": [],
  "composition_frameworks": [],
  "camera_directions": [],
  "materials": [],
  "textures": [],
  "template_concepts": [],
  "animation_concepts": [],
  "visual_stories": [],
  "concept_summary": ""
}

Rules:
- Master metaphor: 1 sentence.
- Concept categories: abstract, environment, character, transformation.
- Symbols: 8–15.
- Composition frameworks: 4–7.
- Camera directions: cinematic.
- Materials: 5–10.
- Textures: 5–10.
- Template concepts: 3–8.
- Animation concepts: 4–8.
- Visual stories: 2–5.
`.trim();
}
