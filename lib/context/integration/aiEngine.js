export function buildPromptFromContext(state = {}) {
  const mode = state.mode || "design";
  const selection = state.selection?.length || 0;
  return `Mode: ${mode}. Selection count: ${selection}. Suggest next creative move.`;
}
