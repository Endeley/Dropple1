export function buildFeed({ type = "for_you", posts = [] } = {}) {
  return {
    type,
    posts,
    generatedAt: Date.now(),
  };
}
