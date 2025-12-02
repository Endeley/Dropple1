export function viewTimeline(timeline) {
  return { events: timeline.events?.length || 0, branches: timeline.branches?.length || 0 };
}
