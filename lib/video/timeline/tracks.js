export function createTrack(type = "video") {
  return {
    id: `track_${Math.random().toString(36).slice(2, 8)}`,
    type,
    clips: [],
  };
}

export function addClip(track, clip) {
  const next = { ...track, clips: [...track.clips, clip] };
  return next;
}

export function removeClip(track, clipId) {
  return { ...track, clips: track.clips.filter((c) => c.clipId !== clipId) };
}
