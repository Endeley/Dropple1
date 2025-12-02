import { analyzeScene } from "../core/sceneAnalyzer";

export function predictIntent(state = {}) {
  const analysis = analyzeScene(state);
  if (analysis.selectionCount > 2) {
    return { intent: "fine_tuning_layout", reason: "Multiple items selected" };
  }
  if (analysis.has3D) {
    return { intent: "adjust_3d_scene", reason: "3D layer detected" };
  }
  if ((state.layers || []).length === 0) {
    return { intent: "start_new_composition", reason: "Empty canvas" };
  }
  return { intent: "continue_editing", reason: "No strong signal" };
}
