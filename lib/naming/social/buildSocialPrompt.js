export function buildSocialPrompt({ topic, tone, platform, target, keywords = [] } = {}) {
  const kw = Array.isArray(keywords) ? keywords.filter(Boolean).join(", ") : `${keywords || ""}`;
  return `
You are Dropple’s Social Caption & Hashtag Engine.

Write social content for:

Topic: "${topic}"
Platform: ${platform}
Tone: ${tone}
Audience: ${target}
Keywords: ${kw}

Return JSON ONLY:

{
  "hooks": [],
  "short_caption": "",
  "long_caption": "",
  "hashtags": [],
  "cta": "",
  "emoji_pack": []
}

Rules:
- Hooks: short, scroll-stopping, platform-optimized.
- Short caption: 1–2 sentences max.
- Long caption: 3–6 punchy lines.
- Hashtags: max 8 (IG), max 4 (TikTok), max 6 (LinkedIn), none for X.
- CTA: platform-appropriate.
- Emoji pack: relevant, minimal.
- Must match tone + brand personality.
- Avoid explicit clickbait.
`.trim();
}
