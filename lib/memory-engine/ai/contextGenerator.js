export function generateContext(memories = []) {
  return memories.map((m) => m.output || m.event || m.detail || m.decision || "").join("\n").slice(0, 1000);
}
