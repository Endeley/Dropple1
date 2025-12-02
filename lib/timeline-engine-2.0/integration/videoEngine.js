export function pushTimelineToVideo(timeline) {
  return { id: timeline.id, status: "video_synced" };
}
