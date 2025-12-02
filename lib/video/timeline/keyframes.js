export function createKeyframe({ property, time, value, easing = "linear" }) {
  return {
    id: `kf_${Math.random().toString(36).slice(2, 8)}`,
    property,
    time,
    value,
    easing,
  };
}

export function sortKeyframes(list = []) {
  return [...list].sort((a, b) => a.time - b.time);
}
