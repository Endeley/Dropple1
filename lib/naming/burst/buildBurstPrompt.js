export function buildBurstPrompt({ concept, tone, keywords = [], count = 100 } = {}) {
  const kw = Array.isArray(keywords) ? keywords.filter(Boolean).join(", ") : `${keywords || ""}`;
  return `
You are Dropple's Creative Burst Naming Engine.

Generate EXACTLY ${count} unique names based on the concept: "${concept}".

Tone: ${tone || "Creative"}
Keywords: ${kw}

Rules:
- Names must be short, brandable, punchy.
- No duplicates.
- No numbering (no "Name 01", "Name 02").
- Must be diverse but themed.
- Avoid long sentences.
- One or two words maximum.
- No explanations.

Return JSON ONLY:
{
  "names": []
}
`.trim();
}
