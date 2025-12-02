const snapshots = [];

export function saveSnapshot(label = "sim", data = {}) {
  const snap = { id: `snap_${Math.random().toString(36).slice(2, 8)}`, label, data, ts: Date.now() };
  snapshots.push(snap);
  return snap;
}

export function listSnapshots() {
  return snapshots;
}
