export function fetchContextSummary(state = {}) {
  return {
    mode: state.mode || "design",
    selection: (state.selection || []).length,
  };
}
