export function pushTimelineToUniverse(timeline) {
  return { id: timeline.id, status: "universe_synced" };
}
