export function clusterTopics(tags = []) {
  return tags.length ? [{ cluster: "default", tags }] : [];
}
