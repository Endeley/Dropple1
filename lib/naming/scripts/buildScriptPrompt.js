export function buildScriptPrompt({ type, topic, tone, audience, length, characters = [] } = {}) {
  return `
You are Dropple’s Script Writing Engine.

Write a complete script.

Type: ${type}
Topic: "${topic}"
Tone: ${tone}
Audience: ${audience}
Length: ${length} seconds or appropriate word count
Characters: ${JSON.stringify(characters)}

Return JSON ONLY:

{
  "title_options": [],
  "logline": "",
  "hook": "",
  "outline": [],
  "script": "",
  "short_version": "",
  "cta": "",
  "notes": ""
}

Rules:
- Write with proper script formatting (INT./EXT., dialogue, scene headers).
- Short version: optimized for TikTok/Reels.
- CTA must match platform.
- Use characters if provided (from Character Persona Engine).
- Outline: 5–10 beats.
- Logline: 1 sentence summary.
- Tone must match request.
- Keep pacing tight and engaging.
`.trim();
}
