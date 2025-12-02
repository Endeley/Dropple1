export function buildRepurposePrompt({ source, type, tone, audience, amount } = {}) {
  return `
You are Dropple’s Multi-Channel Content Repurposing Engine.

Repurpose the following content:

Source Type: ${type}
Tone: ${tone}
Audience: ${audience}
Amount of Content: ${amount}

Source Content:
"""${source}"""

Return JSON ONLY:

{
  "short_videos": [],
  "reels_tiktoks": [],
  "threads": [],
  "linkedIn_posts": [],
  "facebook_posts": [],
  "carousels": [],
  "quotes": [],
  "blog_articles": [],
  "email_newsletters": [],
  "cta_snippets": [],
  "seo_titles": [],
  "hashtags": {
    "trending": [],
    "niche": [],
    "mixed": []
  },
  "thumbnail_titles": []
}

Rules:
- Short videos must include timecodes + suggested edits.
- Carousels must include slide-by-slide breakdown.
- Threads must follow 1 idea → 10–14 tweets format.
- Email newsletters must include subject line + CTA.
- Blog article must be 800–1500 words.
- Quotes must be short, punchy, and text-layer friendly.
- SEO titles must be optimized for YouTube & Google.
- Hashtags must be relevant, safe, and high performing.
- Keep JSON clean and structured.
`.trim();
}
