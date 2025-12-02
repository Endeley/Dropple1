export function resolveDependencies(steps = []) {
  return steps.map((s) => ({
    ...s,
    deps: s.action === "render_video" ? ["assets_ready", "timeline_locked"] : [],
  }));
}
