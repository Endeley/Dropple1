export function boostFromSocial(metrics = {}) {
  return { boost: (metrics.likes || 0) * 0.01 + (metrics.remixes || 0) * 0.05 };
}
