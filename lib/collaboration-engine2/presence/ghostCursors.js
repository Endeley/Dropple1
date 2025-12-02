const cursors = new Map();

export function setCursor(userId, pos) {
  cursors.set(userId, { ...pos, ts: Date.now() });
}

export function getCursors() {
  return Array.from(cursors.entries()).map(([id, data]) => ({ id, ...data }));
}
