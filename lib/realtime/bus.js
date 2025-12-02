const listeners = new Map(); // event -> Set<fn>

export function publish(event, payload) {
  const set = listeners.get(event);
  if (!set) return;
  set.forEach((fn) => {
    try {
      fn(payload);
    } catch (err) {
      console.error("Realtime bus listener error", err);
    }
  });
}

export function subscribe(event, fn) {
  const set = listeners.get(event) || new Set();
  set.add(fn);
  listeners.set(event, set);
  return () => {
    set.delete(fn);
  };
}

export function resetBus() {
  listeners.clear();
}
