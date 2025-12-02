export function pushTimelineToAnimation(timeline) {
  return { id: timeline.id, status: "animation_synced" };
}
