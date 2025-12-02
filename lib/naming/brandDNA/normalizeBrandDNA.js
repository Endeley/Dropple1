export function normalizeBrandDNA(data = {}) {
  return {
    values: Array.isArray(data.values) ? data.values : [],
    personality: Array.isArray(data.personality) ? data.personality : [],
    voice_principles: Array.isArray(data.voice_principles) ? data.voice_principles : [],
    tone_rules: {
      tone: data.tone_rules?.tone || "",
      do: Array.isArray(data.tone_rules?.do) ? data.tone_rules.do : [],
      dont: Array.isArray(data.tone_rules?.dont) ? data.tone_rules.dont : [],
    },
    mission: data.mission || "",
    positioning: data.positioning || "",
    writing_examples: {
      headline: data.writing_examples?.headline || "",
      sentence: data.writing_examples?.sentence || "",
      cta: data.writing_examples?.cta || "",
    },
  };
}
