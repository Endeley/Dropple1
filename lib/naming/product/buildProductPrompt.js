export function buildProductPrompt({ product, tone, audience, keywords = [], industry } = {}) {
  const kw = Array.isArray(keywords) ? keywords.filter(Boolean).join(", ") : `${keywords || ""}`;
  return `
You are Dropple's Product Description Engine.

Write complete e-commerce copy for the following product:

Product: "${product}"
Tone: ${tone}
Audience: ${audience}
Industry: ${industry}
Keywords: ${kw}

Return JSON ONLY:

{
  "title": "",
  "short_description": "",
  "long_description": "",
  "features": [],
  "benefits": [],
  "seo_keywords": [],
  "cta": []
}

Rules:
- Title: 4–10 words max, catchy, modern.
- Short description: 1–2 sentences.
- Long description: 3–6 sentences.
- Features: factual product attributes.
- Benefits: emotional payoffs for the user.
- SEO keywords: 5–10 relevant search terms.
- CTA: 2–4 modern call-to-actions.
- Keep it clean, modern, and commercial.
- Avoid clichés like “best product.”
- Make it sound premium and professional.
`.trim();
}
