export function resolveLayerConflict(localLayer, incomingLayer) {
  // Simple last-writer-wins based on updatedAt
  const localTime = localLayer?.updatedAt || 0;
  const incomingTime = incomingLayer?.updatedAt || Date.now();
  if (incomingTime >= localTime) return { ...localLayer, ...incomingLayer };
  return localLayer;
}

export function resolveDeleteVsEdit(layer, incoming) {
  if (incoming?.deleted) return { ...layer, deleted: true };
  return incoming;
}
