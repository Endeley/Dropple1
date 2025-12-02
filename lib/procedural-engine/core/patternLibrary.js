const patterns = new Map();

export function addPattern(name, pattern) {
  patterns.set(name, pattern);
}

export function getPattern(name) {
  return patterns.get(name);
}
