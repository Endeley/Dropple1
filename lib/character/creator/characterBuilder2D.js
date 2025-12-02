export function build2DCharacter({ style = "cartoon", name = "Avatar" }) {
  return {
    id: `char2d_${Math.random().toString(36).slice(2, 8)}`,
    name,
    style,
    rig: null,
    parts: ["head", "torso", "arms", "legs", "eyes", "mouth"],
  };
}
