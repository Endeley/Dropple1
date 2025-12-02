export function normalizeProductCopy(data = {}) {
  return {
    title: data.title || "",
    short_description: data.short_description || "",
    long_description: data.long_description || "",
    features: Array.isArray(data.features) ? data.features : [],
    benefits: Array.isArray(data.benefits) ? data.benefits : [],
    seo_keywords: Array.isArray(data.seo_keywords) ? data.seo_keywords : [],
    cta: Array.isArray(data.cta) ? data.cta : [],
  };
}
