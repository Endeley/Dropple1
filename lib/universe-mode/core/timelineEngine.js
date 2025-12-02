export function createTimeline(events = []) {
  return { events, branches: [] };
}

export function addBranch(timeline, label) {
  timeline.branches.push({ label, events: [] });
  return timeline;
}
