import { publish, subscribe } from "./bus";
import { EVENT_TYPES } from "./eventTypes";

const presenceState = new Map(); // userId -> presence object

export function setPresence(presence) {
  if (!presence?.userId) return;
  presenceState.set(presence.userId, {
    status: "online",
    ...presence,
    updatedAt: Date.now(),
  });
  publish(EVENT_TYPES.PRESENCE, Array.from(presenceState.values()));
}

export function removePresence(userId) {
  if (!userId) return;
  presenceState.delete(userId);
  publish(EVENT_TYPES.PRESENCE, Array.from(presenceState.values()));
}

export function getPresence() {
  return Array.from(presenceState.values());
}

export function onPresence(callback) {
  return subscribe(EVENT_TYPES.PRESENCE, callback);
}
