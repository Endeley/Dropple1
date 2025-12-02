const generators = new Map();

export function registerGenerator(name, fn) {
  generators.set(name, fn);
}

export function runGenerator(name, payload = {}) {
  const fn = generators.get(name);
  if (!fn) return null;
  return fn(payload);
}
