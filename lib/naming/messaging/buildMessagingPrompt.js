export function buildMessagingPrompt({ brand, industry, audience, tone } = {}) {
  return `
You are Dropple’s Brand Messaging Generator.

Build a complete brand messaging system.

Brand: ${brand}
Industry: ${industry}
Audience: ${audience}
Tone: ${tone}

Return JSON ONLY:

{
  "mission": "",
  "vision": "",
  "promise": "",
  "value_proposition": "",
  "elevator_pitch_short": "",
  "elevator_pitch_long": "",
  "values": [],
  "messaging_pillars": [],
  "personality": [],
  "tone_guide": {},
  "taglines": [],
  "audience_breakdown": {
    "primary": [],
    "secondary": []
  },
  "brand_story": "",
  "origin_story": "",
  "positioning": "",
  "social_bios": {},
  "message_templates": {
    "website_hero": "",
    "about_page": "",
    "social_caption_template": "",
    "email_intro": "",
    "product_description": ""
  }
}

Rules:
- Mission: 1 sentence.
- Vision: inspiring, future-oriented.
- Promise: concise.
- Value proposition: 1–2 sentences.
- Elevator pitches: 1 short, 1 long.
- Values: 4–8 items.
- Messaging pillars: 3–6 items.
- Personality traits: 5–10 items.
- Tone guide: specify voice in different situations.
- Taglines: 5–10 options.
- Brand story: 4–8 paragraphs.
- Origin story: 2–4 paragraphs.
- Positioning: 1–2 paragraphs.
- Social bios: Instagram, TikTok, X, LinkedIn.
- Templates: short, clean, high-converting.
`.trim();
}
