const logs = [];

export function logEvent(event) {
  logs.push({ ...event, ts: Date.now() });
  if (logs.length > 5000) logs.shift();
  return logs;
}

export function getRecentEvents(limit = 50) {
  return logs.slice(-limit);
}
