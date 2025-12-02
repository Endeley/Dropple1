export function syncToAction(timeline, action = "beat") {
  timeline.syncedTo = action;
  return timeline;
}
