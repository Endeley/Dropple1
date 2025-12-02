export function orchestrate(tasks = []) {
  return tasks.map((t, i) => ({ ...t, order: i, status: "assigned" }));
}
