export function generateScenes({ beats = [], style = "cinematic" }) {
  return beats.map((beat, idx) => ({
    id: `scene_${idx + 1}`,
    beat,
    mood: style,
    duration: 8,
    environment: "generic",
    camera: { type: "dolly", move: "in", ease: "easeInOutQuad" },
    lighting: "soft side light",
    notes: [],
  }));
}
