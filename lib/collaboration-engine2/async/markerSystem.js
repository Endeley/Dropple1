const markers = [];

export function addMarker(targetId, pos, authorId) {
  const m = { id: `mark_${Math.random().toString(36).slice(2, 8)}`, targetId, pos, authorId, ts: Date.now() };
  markers.push(m);
  return m;
}

export function listMarkers(targetId) {
  return markers.filter((m) => m.targetId === targetId);
}
