export function suggestMerge(changes = []) {
  return { suggestion: "merge_all", count: changes.length };
}
