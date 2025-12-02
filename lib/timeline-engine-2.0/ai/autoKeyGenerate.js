export function autoGenerateKeys(track, count = 3) {
  track.keyframes = track.keyframes || [];
  for (let i = 0; i < count; i += 1) {
    track.keyframes.push({ time: i, value: Math.random() });
  }
  return track;
}
