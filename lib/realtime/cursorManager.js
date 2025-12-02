import { publish, subscribe } from "./bus";
import { EVENT_TYPES } from "./eventTypes";

const cursors = new Map(); // userId -> {x,y,color,name}

export function updateCursor({ userId, x, y, color, name }) {
  if (!userId) return;
  cursors.set(userId, { userId, x, y, color, name, updatedAt: Date.now() });
  publish(EVENT_TYPES.CURSOR, Array.from(cursors.values()));
}

export function clearCursor(userId) {
  if (!userId) return;
  cursors.delete(userId);
  publish(EVENT_TYPES.CURSOR, Array.from(cursors.values()));
}

export function onCursors(callback) {
  return subscribe(EVENT_TYPES.CURSOR, callback);
}

export function getCursors() {
  return Array.from(cursors.values());
}
