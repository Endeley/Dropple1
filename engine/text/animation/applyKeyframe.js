import { easings } from "./easings.js";

/**
 * Interpolate properties between keyframes at time t.
 * Mutates nothing; returns interpolated props to apply to the word.
 */
export function applyKeyframe(word, track, t) {
  if (track.length === 0) return;

  let k1 = track[0];
  let k2 = track[track.length - 1];

  for (let i = 0; i < track.length - 1; i++) {
    if (t >= track[i].time && t <= track[i + 1].time) {
      k1 = track[i];
      k2 = track[i + 1];
      break;
    }
  }

  const span = k2.time - k1.time;
  const alpha = span === 0 ? 1 : (t - k1.time) / span;

  const ease = easings[k2.easing] || easings.linear;
  const eased = ease(alpha);

  const result = {};
  for (const key in k2.props) {
    const start = k1.props[key] ?? 0;
    const end = k2.props[key];
    result[key] = start + (end - start) * eased;
  }

  return result;
}
