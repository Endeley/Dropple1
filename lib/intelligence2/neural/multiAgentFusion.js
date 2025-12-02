export function fuseAgents(outputs = []) {
  const combined = outputs.flat();
  return {
    count: combined.length,
    summary: combined.map((o) => o.summary || o.action || "task"),
  };
}
