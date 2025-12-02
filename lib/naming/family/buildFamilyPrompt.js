export function buildFamilyPrompt({ base, tone, keywords = [], language = "English" } = {}) {
  const kw = Array.isArray(keywords) ? keywords.filter(Boolean).join(", ") : `${keywords || ""}`;
  return `
You are Dropple's AI Naming System.

Create a full naming SYSTEM based on the base name: "${base}".

Provide structured JSON only.

Sections:
1. base_names: Different clean roots based on the concept.
2. series: Product-line style names (Pro, Max, X).
3. variants: Tiered versions.
4. editions: Seasonal + color + theme editions.
5. short_codes: Abbreviations (e.g., X, XR, UX, L1, L2).
6. ui_versions: Names suited for UI templates or design systems.

Tone: ${tone || "Modern"}
Keywords: ${kw}
Language: ${language}

Return JSON:
{
  "base_names": [],
  "series": [],
  "variants": [],
  "editions": [],
  "short_codes": [],
  "ui_versions": []
}
`.trim();
}
