const history = [];

export function logUserAction(action) {
  history.push({ action, ts: Date.now() });
}

export function getUserHistory(limit = 50) {
  return history.slice(-limit);
}
