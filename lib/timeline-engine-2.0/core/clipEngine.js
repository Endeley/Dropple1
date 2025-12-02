export function addClip(track, clip) {
  track.clips = track.clips || [];
  track.clips.push({ ...clip, id: `clip_${Math.random().toString(36).slice(2, 8)}` });
  return track;
}
