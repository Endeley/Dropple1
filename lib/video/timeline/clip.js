export function createClip({ start = 0, end = 1, assetId, layerType = "video" }) {
  return {
    clipId: `clip_${Math.random().toString(36).slice(2, 8)}`,
    start,
    end,
    assetId,
    layerType,
    keyframes: [],
    effects: [],
  };
}

export function duration(clip) {
  return (clip.end || 0) - (clip.start || 0);
}
