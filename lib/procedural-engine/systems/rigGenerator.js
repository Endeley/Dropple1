export function generateRig(type = "humanoid") {
  return { type, bones: type === "humanoid" ? 64 : 20 };
}
