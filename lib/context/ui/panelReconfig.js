export function reconfigurePanels({ mode = "design", hasTimeline = false }) {
  const layout = [];
  layout.push("tools");
  layout.push("canvas");
  if (hasTimeline || mode === "animation" || mode === "video") layout.push("timeline");
  if (mode === "3d") layout.push("scene-graph");
  layout.push("inspector");
  return layout;
}
