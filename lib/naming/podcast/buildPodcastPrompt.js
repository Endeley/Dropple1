export function buildPodcastPrompt({ title, topic, tone, type, length, characters = [] } = {}) {
  return `
You are Dropple’s Podcast Script Engine.

Write a full podcast episode script.

Show Title: ${title}
Episode Topic: "${topic}"
Tone: ${tone}
Episode Type: ${type}
Length: ${length} minutes
Characters (for interviews or dramas): ${JSON.stringify(characters)}

Return JSON ONLY:

{
  "cold_open": "",
  "intro": "",
  "segments": [
    {
      "title": "",
      "content": ""
    }
  ],
  "cta": "",
  "outro": "",
  "show_notes": "",
  "timestamps": []
}

Rules:
- Cold open: powerful 30–60 seconds.
- Intro: 1–2 minutes.
- 3–6 segments depending on length.
- Segments must be structured and narrative-driven.
- CTA: clear and inspiring.
- Outro: warm closure.
- Show notes: 3–5 sentences.
- Keep tone consistent.
- If interview: alternate between host + guest.
- If drama: include character dialogue + scene cues.
`.trim();
}
