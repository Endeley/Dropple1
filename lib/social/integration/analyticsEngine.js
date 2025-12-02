export function trackSocialMetric(metric, value = 1) {
  return { metric, value, ts: Date.now() };
}
