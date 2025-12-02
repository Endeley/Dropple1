export function buildPipeline(tasks = []) {
  return tasks.map((t) => ({ action: t, status: "queued" }));
}
