const tasks = [];

export function schedule(task, when) {
  const id = `task_${Math.random().toString(36).slice(2, 8)}`;
  tasks.push({ id, task, when });
  return id;
}

export function listTasks() {
  return tasks;
}

export function clearTasks() {
  tasks.length = 0;
}
