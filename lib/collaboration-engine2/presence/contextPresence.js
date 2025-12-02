export function inferPresenceContext(action = "") {
  if (action.includes("timeline")) return "animating";
  if (action.includes("color")) return "color_grading";
  return "editing";
}
