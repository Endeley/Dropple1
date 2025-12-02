export function renderTimelineView(timeline) {
  return { tracks: timeline.tracks?.length || 0, rendered: true };
}
