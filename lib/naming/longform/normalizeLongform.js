export function normalizeLongform(data = {}) {
  return {
    title_options: Array.isArray(data.title_options) ? data.title_options : [],
    outline: Array.isArray(data.outline) ? data.outline : [],
    article: data.article || "",
    seo_keywords: Array.isArray(data.seo_keywords) ? data.seo_keywords : [],
    meta_description: data.meta_description || "",
    social_snippets: Array.isArray(data.social_snippets) ? data.social_snippets : [],
  };
}
