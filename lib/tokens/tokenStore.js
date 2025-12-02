const store = {
  org: {},
  team: {},
  brand: {},
  theme: {},
  uikit: {},
  components: {},
  layer: {},
};

const listeners = new Set();

export function setTokens(scope, tokens) {
  store[scope] = tokens || {};
  listeners.forEach((fn) => {
    try {
      fn(getAllTokens());
    } catch {
      /* noop */
    }
  });
}

export function getTokens(scope) {
  return store[scope] || {};
}

export function getAllTokens() {
  return { ...store };
}

export function onTokens(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function patchTokens(scope, patch) {
  const current = store[scope] || {};
  setTokens(scope, { ...current, ...(patch || {}) });
}
