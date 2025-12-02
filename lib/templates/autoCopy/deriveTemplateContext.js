export function deriveTemplateContext(template = {}) {
  const { category, tone, colors, audience, keywords } = template;

  const inferredTone =
    tone || (Array.isArray(colors) && colors.some((c) => `${c}`.toLowerCase() === "#000") ? "Minimal" : "Creative");

  return {
    category: category || "Generic",
    tone: inferredTone,
    audience: audience || "General",
    keywords: Array.isArray(keywords) ? keywords : [],
  };
}
