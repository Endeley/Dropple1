// Trigger system scaffold — registers trigger handlers and dispatches events.
const registry = new Map();

export const registerTrigger = (type, handler) => {
  if (!registry.has(type)) registry.set(type, new Set());
  registry.get(type).add(handler);
  return () => registry.get(type)?.delete(handler);
};

export const dispatchTrigger = (type, data = {}) => {
  const handlers = registry.get(type);
  if (!handlers) return;
  handlers.forEach((fn) => fn({ type, ...data }));
};
