const effects = new Map();

export function registerEffect(id, handler) {
  effects.set(id, handler);
}

export function listEffects() {
  return Array.from(effects.keys());
}

export function applyEffect(id, frame, params = {}) {
  const fn = effects.get(id);
  if (!fn) return frame;
  return fn(frame, params);
}
