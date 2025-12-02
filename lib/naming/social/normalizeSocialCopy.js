export function normalizeSocialCopy(data = {}) {
  return {
    hooks: Array.isArray(data.hooks) ? data.hooks : [],
    short_caption: data.short_caption || "",
    long_caption: data.long_caption || "",
    hashtags: Array.isArray(data.hashtags) ? data.hashtags : [],
    cta: data.cta || "",
    emoji_pack: Array.isArray(data.emoji_pack) ? data.emoji_pack : [],
  };
}
