export function normalizeConcept(data = {}) {
  return {
    master_metaphor: data.master_metaphor || "",
    concept_categories: Array.isArray(data.concept_categories) ? data.concept_categories : [],
    symbol_library: Array.isArray(data.symbol_library) ? data.symbol_library : [],
    composition_frameworks: Array.isArray(data.composition_frameworks) ? data.composition_frameworks : [],
    camera_directions: Array.isArray(data.camera_directions) ? data.camera_directions : [],
    materials: Array.isArray(data.materials) ? data.materials : [],
    textures: Array.isArray(data.textures) ? data.textures : [],
    template_concepts: Array.isArray(data.template_concepts) ? data.template_concepts : [],
    animation_concepts: Array.isArray(data.animation_concepts) ? data.animation_concepts : [],
    visual_stories: Array.isArray(data.visual_stories) ? data.visual_stories : [],
    concept_summary: data.concept_summary || "",
  };
}
