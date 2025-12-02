export function generateEnvironment({ type = "3D", style = "generic", mood = "neutral" }) {
  return {
    id: `world_${Math.random().toString(36).slice(2, 8)}`,
    type,
    style,
    mood,
    lighting: "cinematic",
    props: [],
    fx: [],
    camera: { position: [0, 2, 6], target: [0, 1, 0], movement: "dolly-in" },
  };
}
