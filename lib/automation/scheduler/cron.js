export function cron(pattern, task) {
  return { pattern, task, id: `cron_${Math.random().toString(36).slice(2, 8)}` };
}
