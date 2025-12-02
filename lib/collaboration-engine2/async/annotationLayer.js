const annotations = [];

export function addAnnotation(targetId, authorId, data) {
  const a = { id: `anno_${Math.random().toString(36).slice(2, 8)}`, targetId, authorId, data, ts: Date.now() };
  annotations.push(a);
  return a;
}

export function listAnnotations(targetId) {
  return annotations.filter((a) => a.targetId === targetId);
}
