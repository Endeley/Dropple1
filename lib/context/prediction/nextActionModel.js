export function predictNextActions({ intent = "continue_editing", selection = [] } = {}) {
  const actions = [];
  if (intent === "fine_tuning_layout") {
    actions.push("align objects", "distribute spacing", "rename layers");
  } else if (intent === "adjust_3d_scene") {
    actions.push("tune lighting", "orbit camera", "add depth of field");
  } else {
    actions.push("add text", "apply palette", "drop in template block");
  }

  if (selection.length === 1) actions.push("open inspector");
  return actions;
}
