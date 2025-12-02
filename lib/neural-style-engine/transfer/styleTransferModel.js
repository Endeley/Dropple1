export function transferStyle(sourceStyle, target) {
  return { ...target, appliedStyle: sourceStyle };
}
