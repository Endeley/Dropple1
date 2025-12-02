export function buildSloganPrompt({ name, tone, keywords = [], audience, count = 12 } = {}) {
  const kw = Array.isArray(keywords) ? keywords.filter(Boolean).join(", ") : `${keywords || ""}`;
  return `
You are Dropple's professional branding and marketing slogan engine.

Generate ${count} slogans with variations:
- Hero taglines (big, bold)
- Short slogans (3–6 words)
- Marketing lines
- CTA lines
- Inspirational/value-based lines
- If brand or template name provided, incorporate it cleverly when helpful.

Brand/Template Name: ${name || "None"}
Tone: ${tone || "Creative"}
Keywords: ${kw}
Audience: ${audience || "General"}

Return this JSON format ONLY:
{
  "hero": [],
  "short": [],
  "cta": [],
  "marketing": [],
  "value_based": []
}
`.trim();
}
