export function rewardEngagement(metrics = {}) {
  const score = (metrics.likes || 0) + (metrics.remixes || 0) * 2 + (metrics.comments || 0);
  return { score, reward: Math.min(100, score) };
}
