export function normalizeCreative(data = {}) {
  return {
    master_concept: data.master_concept || "",
    mood_themes: Array.isArray(data.mood_themes) ? data.mood_themes : [],
    color_environment: Array.isArray(data.color_environment) ? data.color_environment : [],
    lighting_rules: Array.isArray(data.lighting_rules) ? data.lighting_rules : [],
    composition_rules: Array.isArray(data.composition_rules) ? data.composition_rules : [],
    motion_direction: data.motion_direction || {},
    photography_style: Array.isArray(data.photography_style) ? data.photography_style : [],
    illustration_style: Array.isArray(data.illustration_style) ? data.illustration_style : [],
    symbolism: Array.isArray(data.symbolism) ? data.symbolism : [],
    do: Array.isArray(data.do) ? data.do : [],
    dont: Array.isArray(data.dont) ? data.dont : [],
    campaign_concepts: Array.isArray(data.campaign_concepts) ? data.campaign_concepts : [],
    art_direction_summary: data.art_direction_summary || "",
  };
}
