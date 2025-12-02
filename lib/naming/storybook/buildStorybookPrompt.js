export function buildStorybookPrompt({ concept, keywords = [], tone, audience } = {}) {
  const kw = Array.isArray(keywords) ? keywords.filter(Boolean).join(", ") : `${keywords || ""}`;
  return `
You are Dropple’s Brand Storybook Engine.

Create a full BRAND STYLE GUIDE for the concept: "${concept}"

Tone: ${tone}
Audience: ${audience}
Keywords: ${kw}

Return JSON ONLY:

{
  "brand_story": "",
  "mission": "",
  "vision": "",
  "values": [],
  "personality": [],
  "voice": {
    "principles": [],
    "tone": "",
    "examples": {
      "headline": "",
      "tagline": "",
      "cta": ""
    }
  },
  "messaging": {
    "pillars": [],
    "positioning": "",
    "taglines": [],
    "angles": []
  },
  "visuals": {
    "color_palette": [],
    "typography": [],
    "imagery_style": [],
    "composition_rules": []
  },
  "applications": {
    "ads": [],
    "social": [],
    "website": [],
    "logo_usage": [],
    "spacing_rules": ""
  }
}

Rules:
- Brand story should be 3–5 sentences.
- Mission & Vision should be 1–2 sentences.
- Values should be abstract nouns.
- Personality traits should describe brand behavior.
- Voice rules must match the brand tone.
- Color palette: 4–6 swatches with hex style values (e.g., "Violet Spark #8D4CF9").
- Typography: 2–3 font pairings.
- Imagery: describe lighting, style, subject matter.
- Composition: describe spacing, balance, rhythm.
- Applications: provide examples for ads, web, social, and logo rules.
- MUST be modern, clean, creative, and brand-accurate.

Now output the complete JSON.
`.trim();
}
