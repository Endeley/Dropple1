export function normalizeIndustryCopy(data = {}) {
  return {
    copies: (data.copies || []).map((c) => ({
      headline: `${c.headline || ""}`.trim(),
      subheadline: `${c.subheadline || ""}`.trim(),
      body: `${c.body || ""}`.trim(),
      cta: `${c.cta || ""}`.trim(),
    })),
  };
}
