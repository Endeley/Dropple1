export function pushTimelineToWorld(timeline) {
  return { id: timeline.id, status: "world_synced" };
}
