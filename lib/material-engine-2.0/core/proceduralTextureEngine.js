export function generateProceduralTexture(type = "noise") {
  return { type, texture: `tex_${type}_${Date.now()}` };
}
