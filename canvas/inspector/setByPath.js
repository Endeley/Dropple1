export function setByPath(obj, path, value) {
  if (!path) return obj;
  const cleaned = path.replace(/\]/g, "");
  const parts = cleaned.split(/\.|\[/).filter(Boolean);
  if (!parts.length) return obj;

  let curr = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    if (!(key in curr) || typeof curr[key] !== "object") {
      curr[key] = {};
    }
    curr = curr[key];
  }

  curr[parts[parts.length - 1]] = value;
  return obj;
}
