const changes = [];

export function recordChange(change) {
  changes.push({ ...change, ts: Date.now() });
  if (changes.length > 500) changes.shift();
}

export function getChanges(limit = 50) {
  return changes.slice(-limit);
}
