export function createAudioClip({ start = 0, end = 1, bufferId, fadeIn = 0, fadeOut = 0, gain = 1, speed = 1, pitch = 0 }) {
  return {
    id: `aclip_${Math.random().toString(36).slice(2, 8)}`,
    start,
    end,
    bufferId,
    fadeIn,
    fadeOut,
    gain,
    speed,
    pitch,
    markers: [],
  };
}

export function duration(clip) {
  return (clip.end || 0) - (clip.start || 0);
}
