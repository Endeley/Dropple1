export function decideAction({ beliefs = {}, goals = [] }) {
  // Placeholder: choose first goal as action with note.
  const goal = goals[0] || "idle";
  return { action: goal, reason: "first-goal", beliefs };
}
