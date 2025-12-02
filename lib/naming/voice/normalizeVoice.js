export function normalizeVoice(data = {}) {
  return {
    text: `${data.text || ""}`.trim(),
    explanation: `${data.explanation || ""}`.trim(),
    keywords_used: Array.isArray(data.keywords_used) ? data.keywords_used : [],
  };
}
