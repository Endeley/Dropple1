export function generateStyledOutput(target = {}, style = {}) {
  return { ...target, styled: true, style };
}
