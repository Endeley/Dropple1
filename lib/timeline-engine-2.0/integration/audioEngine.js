export function pushTimelineToAudio(timeline) {
  return { id: timeline.id, status: "audio_synced" };
}
