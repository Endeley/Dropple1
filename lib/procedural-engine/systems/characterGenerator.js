export function generateCharacter({ style = "generic" } = {}) {
  return { id: `char_${Math.random().toString(36).slice(2, 8)}`, style, rig: "humanoid" };
}
