export function recordEpisode(event) {
  return { ...event, ts: Date.now() };
}
