export function analyzeTimeline(timeline) {
  return { tracks: timeline.tracks?.length || 0, suggestion: "add easing" };
}
