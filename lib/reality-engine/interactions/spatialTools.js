export function spawnSpatialTool(name = "gizmo") {
  return { name, id: `tool_${Math.random().toString(36).slice(2, 8)}` };
}
