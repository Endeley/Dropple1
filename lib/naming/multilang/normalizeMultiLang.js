export function normalizeMultiLang(data = {}) {
  return {
    translations:
      data.translations?.map((t) => ({
        language: t.language || "",
        text: `${t.text || ""}`.trim(),
        notes: t.notes || "",
      })) || [],
  };
}
