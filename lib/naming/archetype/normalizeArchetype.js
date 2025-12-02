export function normalizeArchetype(data = {}) {
  return {
    primary_archetype: data.primary_archetype || {},
    secondary_archetype: data.secondary_archetype || {},
    tertiary_archetype: data.tertiary_archetype || {},
    brand_drivers: Array.isArray(data.brand_drivers) ? data.brand_drivers : [],
    emotional_triggers: Array.isArray(data.emotional_triggers) ? data.emotional_triggers : [],
    voice: data.voice || {},
    visual_alignment: data.visual_alignment || {},
    story_themes: Array.isArray(data.story_themes) ? data.story_themes : [],
    taglines: Array.isArray(data.taglines) ? data.taglines : [],
    archetype_summary: data.archetype_summary || "",
  };
}
