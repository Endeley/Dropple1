export function createAudioTrack({ name = "Track", type = "audio" } = {}) {
  return {
    id: `atr_${Math.random().toString(36).slice(2, 8)}`,
    name,
    type,
    clips: [],
    volume: 1,
    pan: 0,
    mute: false,
    solo: false,
    effects: [],
  };
}

export function addClip(track, clip) {
  return { ...track, clips: [...track.clips, clip] };
}

export function removeClip(track, clipId) {
  return { ...track, clips: track.clips.filter((c) => c.id !== clipId) };
}
