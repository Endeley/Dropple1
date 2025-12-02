export function normalizeTemplateCopy(data = {}) {
  return {
    headline: `${data.headline || ""}`.trim(),
    subheadline: `${data.subheadline || ""}`.trim(),
    body: `${data.body || ""}`.trim(),
    cta: `${data.cta || ""}`.trim(),
    extra: {
      caption: `${data.extra?.caption || ""}`.trim(),
      details: `${data.extra?.details || ""}`.trim(),
      footer: `${data.extra?.footer || ""}`.trim(),
    },
  };
}
