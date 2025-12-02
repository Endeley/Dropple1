export function automateFromMemory(memories = []) {
  return { steps: memories.length, status: "queued" };
}
