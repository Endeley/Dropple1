export function buildIndustryPrompt({
  industry,
  context,
  tone,
  brand_tone,
  keywords = [],
  count = 5,
  language = "English",
} = {}) {
  const kw = Array.isArray(keywords) ? keywords.filter(Boolean).join(", ") : `${keywords || ""}`;
  return `
You are Dropple’s Industry-Specific Copywriting Engine.

Write professional, high-quality content for:

Industry: ${industry}
Context: ${context}
Tone: ${tone}
Brand Tone: ${brand_tone}
Keywords: ${kw}
Language: ${language}

Generate ${count} variations.

Return JSON ONLY:

{
  "copies": [
    {
      "headline": "",
      "subheadline": "",
      "body": "",
      "cta": ""
    }
  ]
}

Rules:
- Adapt strictly to the industry.
- Use correct terminology.
- Match the emotional tone of the target industry.
- Headlines: 3–7 words max.
- Subheadlines: 8–16 words.
- Body: 1–3 sentences.
- CTA: concise and industry-relevant.
- No filler text.
- No lorem ipsum.
`.trim();
}
