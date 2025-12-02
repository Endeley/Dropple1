export function replicateState(state = {}) {
  return { replicated: true, bytes: JSON.stringify(state).length };
}
