export function buildVideoPrompt({ topic, tone, platform, target, keywords = [] } = {}) {
  const kw = Array.isArray(keywords) ? keywords.filter(Boolean).join(", ") : `${keywords || ""}`;
  return `
You are Dropple’s Video Metadata Engine.

Generate full SEO-optimized video metadata.

Topic: "${topic}"
Tone: ${tone}
Platform: ${platform}
Target Audience: ${target}
Keywords: ${kw}

Return JSON ONLY:

{
  "title_options": [],
  "description_long": "",
  "description_short": "",
  "hook": "",
  "hashtags": [],
  "tags": [],
  "chapters": [],
  "cta_block": "",
  "affiliate_block": "",
  "notes": ""
}

Rules:
- Titles must be SEO-friendly and click-optimized.
- Long description: 150–300+ words.
- Short description: 1–2 lines.
- Include natural keyword usage.
- Hashtags: max 10 (YouTube), max 6 (TikTok).
- Chapters optional unless YouTube.
- CTA block: clean & modern.
- Affiliate block: generic template.
- Tags: 10–20 SEO keywords.
- Must match tone + platform.
`.trim();
}
