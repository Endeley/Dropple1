const cursors = new Map();

export function updateCursorRemote(id, data) {
  cursors.set(id, { ...data, updatedAt: Date.now() });
  return Array.from(cursors.values());
}

export function getCursors() {
  return Array.from(cursors.values());
}
