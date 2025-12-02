export function normalizePersona(data = {}) {
  return {
    name: data.name || "",
    age: data.age || "",
    summary: data.summary || "",
    personality_traits: Array.isArray(data.personality_traits) ? data.personality_traits : [],
    backstory: data.backstory || "",
    motivation: data.motivation || "",
    strengths: Array.isArray(data.strengths) ? data.strengths : [],
    weaknesses: Array.isArray(data.weaknesses) ? data.weaknesses : [],
    speech_style: data.speech_style || "",
    signature_phrases: Array.isArray(data.signature_phrases) ? data.signature_phrases : [],
    dialogue_samples: Array.isArray(data.dialogue_samples) ? data.dialogue_samples : [],
    emotional_arc: data.emotional_arc || "",
    visual_style: Array.isArray(data.visual_style) ? data.visual_style : [],
    relationships: Array.isArray(data.relationships) ? data.relationships : [],
  };
}
