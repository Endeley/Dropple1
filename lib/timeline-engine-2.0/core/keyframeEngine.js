export function addKeyframe(track, time, value) {
  track.keyframes = track.keyframes || [];
  track.keyframes.push({ time, value });
  return track;
}
