export function buildPersonaPrompt({ concept, tone, role, world, keywords = [] } = {}) {
  const kw = Array.isArray(keywords) ? keywords.filter(Boolean).join(", ") : `${keywords || ""}`;
  return `
You are Dropple’s Character Persona Writing Engine.

Create a complete CHARACTER PROFILE for the following concept:

Concept: "${concept}"
Role: ${role}
Tone: ${tone}
World/Setting: ${world}
Keywords: ${kw}

Return JSON ONLY:

{
  "name": "",
  "age": "",
  "summary": "",
  "personality_traits": [],
  "backstory": "",
  "motivation": "",
  "strengths": [],
  "weaknesses": [],
  "speech_style": "",
  "signature_phrases": [],
  "dialogue_samples": [],
  "emotional_arc": "",
  "visual_style": [],
  "relationships": []
}

Rules:
- Name must sound authentic to character culture.
- Backstory: 4–7 sentences max.
- Dialogue: 2–4 exchanges.
- Emotional arc: 1 concise paragraph.
- Visual style: 4–8 stylistic cues.
- Keep tone consistent with world/genre.
- Be creative, original, and vivid.
`.trim();
}
