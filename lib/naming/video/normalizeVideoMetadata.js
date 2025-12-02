export function normalizeVideoMetadata(data = {}) {
  return {
    title_options: Array.isArray(data.title_options) ? data.title_options : [],
    description_long: data.description_long || "",
    description_short: data.description_short || "",
    hook: data.hook || "",
    hashtags: Array.isArray(data.hashtags) ? data.hashtags : [],
    tags: Array.isArray(data.tags) ? data.tags : [],
    chapters: Array.isArray(data.chapters) ? data.chapters : [],
    cta_block: data.cta_block || "",
    affiliate_block: data.affiliate_block || "",
    notes: data.notes || "",
  };
}
