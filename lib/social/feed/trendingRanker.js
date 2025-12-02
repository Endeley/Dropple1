export function rankTrending(posts = []) {
  return posts
    .map((p) => ({ ...p, score: (p.likes || 0) + (p.remixes || 0) * 2 }))
    .sort((a, b) => b.score - a.score);
}
