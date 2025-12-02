const deltas = [];

export function trackDelta(delta) {
  deltas.push({ ...delta, ts: Date.now() });
  return delta;
}

export function getDeltas() {
  return [...deltas];
}

export function clearDeltas() {
  deltas.length = 0;
}
