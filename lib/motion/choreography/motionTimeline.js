export function createMotionTimeline() {
  return {
    layers: [],
  };
}

export function addLayerMotion(timeline, layerId, animations) {
  const layer = { layerId, animations };
  return { ...timeline, layers: [...timeline.layers, layer] };
}
