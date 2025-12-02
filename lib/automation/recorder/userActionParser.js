export function parseUserActions(actions = []) {
  return actions.map((a) => ({
    type: a.type || "unknown",
    params: a.meta || {},
    ts: a.ts || Date.now(),
  }));
}
