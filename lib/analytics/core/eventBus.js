const listeners = new Map();

export function emitEvent(name, payload) {
  const set = listeners.get(name);
  if (!set) return;
  set.forEach((fn) => {
    try {
      fn(payload);
    } catch (err) {
      console.error("Analytics listener error", err);
    }
  });
}

export function onEvent(name, fn) {
  const set = listeners.get(name) || new Set();
  set.add(fn);
  listeners.set(name, set);
  return () => set.delete(fn);
}
