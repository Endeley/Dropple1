export function buildPairedPrompt({ concept, tone, audience, keywords = [], count = 10 } = {}) {
  const kw = Array.isArray(keywords) ? keywords.filter(Boolean).join(", ") : `${keywords || ""}`;
  return `
You are Dropple’s Branding System AI.

Generate ${count} complete brand systems.

Each system MUST include:
{
  "name": "",
  "meaning": "",
  "short_slogan": "",
  "hero_tagline": "",
  "cta": "",
  "tone": "",
  "variants": [],
  "color_themes": [],
  "brand_story": ""
}

Concept: ${concept}
Tone: ${tone}
Audience: ${audience}
Keywords: ${kw}

Rules:
- Names must be short and brandable.
- Slogans must be powerful and emotional.
- Hero taglines should be bold but concise.
- CTA must be actionable and modern.
- Variants must follow naming family logic (e.g., X, Core, Ultra).
- Color themes must be creative but realistic.
- Brand story = 1–2 sentences only.
- Return JSON only.

Now generate the list.
`.trim();
}
