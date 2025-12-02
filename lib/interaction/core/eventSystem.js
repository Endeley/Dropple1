const listeners = new Map();

export function on(event, fn) {
  const list = listeners.get(event) || new Set();
  list.add(fn);
  listeners.set(event, list);
  return () => {
    list.delete(fn);
    listeners.set(event, list);
  };
}

export function emit(event, payload) {
  const list = listeners.get(event);
  if (!list) return;
  list.forEach((fn) => {
    try {
      fn(payload);
    } catch (err) {
      console.error("Interaction event error", err);
    }
  });
}
