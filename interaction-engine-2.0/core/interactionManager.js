// Dropple Interaction Engine 2.0 — interaction manager scaffold
export const createInteractionManager = () => {
  const subscribers = new Set();
  const register = (fn) => {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  };
  const emit = (event) => subscribers.forEach((fn) => fn(event));
  return { register, emit };
};

export const interactionManager = createInteractionManager();
