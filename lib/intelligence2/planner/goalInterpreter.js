export function interpretGoal(goal = "") {
  if (!goal) return { tasks: [], summary: "No goal" };
  const lower = goal.toLowerCase();
  const tasks = [];
  if (lower.includes("video")) tasks.push("generate_script", "build_storyboard", "render_video");
  if (lower.includes("poster")) tasks.push("design_layout", "apply_brand", "export_image");
  tasks.push("review");
  return {
    goal,
    tasks,
    summary: `Parsed ${tasks.length} tasks`,
  };
}
