export function trackStep(action, payload = {}) {
  return {
    action,
    payload,
    ts: Date.now(),
  };
}
