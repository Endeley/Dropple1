const preferences = {
  tools: {},
  colors: {},
  layouts: {},
};

export function learnFromActions(actions = []) {
  actions.forEach((a) => {
    if (a.meta?.tool) {
      preferences.tools[a.meta.tool] = (preferences.tools[a.meta.tool] || 0) + 1;
    }
    if (a.meta?.color) {
      preferences.colors[a.meta.color] = (preferences.colors[a.meta.color] || 0) + 1;
    }
    if (a.meta?.layout) {
      preferences.layouts[a.meta.layout] = (preferences.layouts[a.meta.layout] || 0) + 1;
    }
  });
}

export function getBehaviorProfile() {
  const top = (obj) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  return {
    favoriteTool: top(preferences.tools),
    favoriteColor: top(preferences.colors),
    favoriteLayout: top(preferences.layouts),
  };
}

export function resetBehavior() {
  Object.keys(preferences).forEach((k) => {
    preferences[k] = {};
  });
}
