const remixEdges = [];

export function addRemix(originalId, remixId) {
  remixEdges.push({ originalId, remixId });
}

export function getRemixTree(id) {
  const children = remixEdges.filter((e) => e.originalId === id).map((e) => e.remixId);
  return { id, children };
}
