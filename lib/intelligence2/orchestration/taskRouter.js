export function routeTask(task) {
  if (task.includes("audio")) return "audio";
  if (task.includes("vfx")) return "vfx";
  if (task.includes("brand")) return "brand";
  return "scene";
}
