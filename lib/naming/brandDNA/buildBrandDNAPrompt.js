export function buildBrandDNAPrompt({ concept, audience, tone, keywords = [] } = {}) {
  const kw = Array.isArray(keywords) ? keywords.filter(Boolean).join(", ") : `${keywords || ""}`;
  return `
You are Dropple’s Brand Strategy & Identity Engine.

Generate a complete BRAND DNA system for the concept: "${concept}".

Tone: ${tone}
Audience: ${audience}
Keywords: ${kw}

Return JSON ONLY:

{
  "values": [],
  "personality": [],
  "voice_principles": [],
  "tone_rules": {
    "tone": "",
    "do": [],
    "dont": []
  },
  "mission": "",
  "positioning": "",
  "writing_examples": {
    "headline": "",
    "sentence": "",
    "cta": ""
  }
}

Rules:
- Values must be universal themes.
- Personality traits must describe how the brand behaves.
- Voice principles must be actionable writing rules.
- Mission must be 1 sentence.
- Positioning must be 1–2 sentences.
- Tone Rules must be clear.
- Provide example copywriting outputs.
- Make it modern, creative, and professional.
`.trim();
}
