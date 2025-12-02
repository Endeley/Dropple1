export function applyAdaptiveUI({ skill = "intermediate", mode = "design", selection = [] } = {}) {
  const panels = [];
  if (mode === "animation") panels.push("timeline", "motion");
  if (mode === "3d") panels.push("camera", "lighting");
  if (selection.length === 1) panels.push("inspector");

  const density = skill === "beginner" ? "spacious" : "compact";

  return {
    panels: Array.from(new Set(panels)),
    density,
    hints: selection.length === 0 ? ["Try adding a template block"] : [],
  };
}
