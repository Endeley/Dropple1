export function restyleDesign(design = {}, style = {}) {
  return { ...design, styleApplied: style };
}
