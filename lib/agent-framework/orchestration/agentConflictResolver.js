export function resolveAgentConflicts(actions = []) {
  return { actions: actions.length, resolution: "merge" };
}
