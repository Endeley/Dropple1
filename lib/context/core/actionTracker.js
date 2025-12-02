const actions = [];

export function addAction(action, meta = {}) {
  actions.push({
    type: action,
    meta,
    ts: Date.now(),
  });
  if (actions.length > 200) actions.shift();
}

export function getRecentActions(limit = 10) {
  return actions.slice(-limit);
}

export function clearActions() {
  actions.length = 0;
}
