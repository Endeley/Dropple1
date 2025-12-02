import { getDocument } from "./documentManager";

const snapshots = new Map(); // docId -> array of snapshots

const clone = (val) => {
  try {
    return structuredClone(val);
  } catch {
    return JSON.parse(JSON.stringify(val));
  }
};

export function listSnapshots(docId) {
  return snapshots.get(docId) || [];
}

export function createSnapshot(docId, label = "") {
  const doc = getDocument(docId);
  if (!doc) throw new Error("Document not found");
  const snap = {
    id: `snap_${Date.now()}`,
    label: label || new Date().toISOString(),
    createdAt: Date.now(),
    model: clone(doc.model),
  };
  const arr = snapshots.get(docId) || [];
  arr.unshift(snap);
  snapshots.set(docId, arr.slice(0, 50)); // keep latest 50
  return snap;
}

export function restoreSnapshot(docId, snapId) {
  const arr = snapshots.get(docId) || [];
  const snap = arr.find((s) => s.id === snapId);
  if (!snap) throw new Error("Snapshot not found");
  return clone(snap.model);
}
