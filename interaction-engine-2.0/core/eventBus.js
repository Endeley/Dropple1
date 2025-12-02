// Lightweight event bus.
const listeners = new Map();

export const on = (type, handler) => {
  if (!listeners.has(type)) listeners.set(type, new Set());
  listeners.get(type).add(handler);
  return () => listeners.get(type)?.delete(handler);
};

export const emit = (type, payload) => {
  listeners.get(type)?.forEach((fn) => fn(payload));
};
