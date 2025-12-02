const events = [];

export function recordEvent(evt) {
  events.push({ ...evt, ts: Date.now() });
}

export function getRecording() {
  return [...events];
}

export function clearRecording() {
  events.length = 0;
}
