export function normalizeRepurposedContent(data = {}) {
  return {
    short_videos: Array.isArray(data.short_videos) ? data.short_videos : [],
    reels_tiktoks: Array.isArray(data.reels_tiktoks) ? data.reels_tiktoks : [],
    threads: Array.isArray(data.threads) ? data.threads : [],
    linkedIn_posts: Array.isArray(data.linkedIn_posts) ? data.linkedIn_posts : [],
    facebook_posts: Array.isArray(data.facebook_posts) ? data.facebook_posts : [],
    carousels: Array.isArray(data.carousels) ? data.carousels : [],
    quotes: Array.isArray(data.quotes) ? data.quotes : [],
    blog_articles: Array.isArray(data.blog_articles) ? data.blog_articles : [],
    email_newsletters: Array.isArray(data.email_newsletters) ? data.email_newsletters : [],
    cta_snippets: Array.isArray(data.cta_snippets) ? data.cta_snippets : [],
    seo_titles: Array.isArray(data.seo_titles) ? data.seo_titles : [],
    hashtags: data.hashtags || { trending: [], niche: [], mixed: [] },
    thumbnail_titles: Array.isArray(data.thumbnail_titles) ? data.thumbnail_titles : [],
  };
}
