export function syncStoryEdits(edits = []) {
  return { edits: edits.length, status: "synced" };
}
