export function buildLongformPrompt({ topic, tone, audience, length = 1200, keywords = [], format = "article" } = {}) {
  const kw = Array.isArray(keywords) ? keywords.filter(Boolean).join(", ") : `${keywords || ""}`;
  return `
You are Dropple's Long-Form Writing Engine.

Write a full long-form piece with the following:

Topic: "${topic}"
Tone: ${tone}
Audience: ${audience}
Length: ${length} words
Format: ${format}
Keywords: ${kw}

Return JSON ONLY:

{
  "title_options": [],
  "outline": [],
  "article": "",
  "seo_keywords": [],
  "meta_description": "",
  "social_snippets": []
}

Rules:
- Outline: 6–10 sections.
- Article: full paragraphs with strong narrative flow.
- Use storytelling + practical explanation.
- Match tone exactly.
- Keep article length close to required length.
- No fluff or repetition.
- SEO keywords must fit topic.
- Social snippets: short, punchy, shareable.
`.trim();
}
