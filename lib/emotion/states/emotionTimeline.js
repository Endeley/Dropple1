export function createEmotionTimeline() {
  return {
    beats: [],
  };
}

export function addEmotionBeat(timeline, beat) {
  return { ...timeline, beats: [...timeline.beats, beat] };
}
