export function buildCopyPrompt({ category, tone, audience, keywords = [] } = {}) {
  const kw = Array.isArray(keywords) ? keywords.filter(Boolean).join(", ") : `${keywords || ""}`;
  return `
You are Dropple’s Auto-Copy AI for templates.

Generate copy for a template that belongs to the category: "${category}".

Tone: ${tone}
Audience: ${audience}
Keywords: ${kw}

Return text in this JSON format ONLY:

{
  "headline": "",
  "subheadline": "",
  "body": "",
  "cta": "",
  "extra": {
    "caption": "",
    "details": "",
    "footer": ""
  }
}

Rules:
- Headline must be strong, 3–7 words.
- Subheadline must support the headline.
- Body text must be 1–3 short sentences MAX.
- CTA must be actionable.
- Caption should be short & social-media friendly.
- Keep everything modern and design-friendly.
- No lorem ipsum.
`.trim();
}
