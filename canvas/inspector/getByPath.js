export function getByPath(obj, path) {
  if (!path || !obj) return undefined;
  const cleaned = path.replace(/\]/g, "");
  const parts = cleaned.split(/\.|\[/).filter(Boolean);

  let curr = obj;
  for (const part of parts) {
    if (curr == null) return undefined;
    curr = curr[part];
  }
  return curr;
}
