export function route(task) {
  if (task.includes("design")) return "design";
  if (task.includes("anim")) return "animation";
  if (task.includes("vfx")) return "vfx";
  return "workflow";
}
