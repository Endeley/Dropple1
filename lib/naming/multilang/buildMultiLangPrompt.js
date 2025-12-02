export function buildMultiLangPrompt({ text, languages = [], personality, tone } = {}) {
  const langs = Array.isArray(languages) ? languages.filter(Boolean).join(", ") : `${languages || ""}`;
  return `
You are Dropple’s Multilingual Brand Copy Engine.

Translate AND localize the following text:
"${text}"

Target languages: ${langs}

Brand personality: ${personality}
Tone: ${tone}

Requirements:
- Maintain brand voice and emotional tone.
- Preserve formatting (headline, sentence, CTA).
- Provide culturally appropriate translations.
- All outputs must be natural and professional.
- Avoid literal word-for-word translation.

Return JSON ONLY:

{
  "translations": [
    {
      "language": "",
      "text": "",
      "notes": ""
    }
  ]
}
`.trim();
}
