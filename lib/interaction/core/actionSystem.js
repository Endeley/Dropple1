export function executeAction(action, ctx = {}) {
  // Placeholder: route to animation, navigation, VFX, or variable set.
  switch (action?.type) {
    case "playAnimation":
      return { ok: true, note: `Play animation ${action.params?.id}` };
    case "setVariable":
      if (ctx.setVar) ctx.setVar(action.params?.key, action.params?.value);
      return { ok: true };
    case "goToScene":
      return { ok: true, note: `Switch to scene ${action.params?.id}` };
    default:
      return { ok: false, note: "Unknown action" };
  }
}
