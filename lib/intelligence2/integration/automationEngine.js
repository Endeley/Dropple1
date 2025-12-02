export function pushToAutomation(tasks = []) {
  return { sent: tasks.length, status: "queued" };
}
