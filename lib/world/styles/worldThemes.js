export const worldThemes = {
  "minimal-flat": {
    type: "2D",
    palette: ["#f7f8fb", "#0b0b12", "#8B5CF6"],
    parallax: true,
    layers: ["foreground", "mid", "bg"],
  },
  "cyberpunk-neon": {
    type: "3D",
    palette: ["#0b0b12", "#8B5CF6", "#22d3ee", "#f472b6"],
    fx: ["fog", "neonGlow", "rain"],
    mood: "night",
  },
  "cozy-office": {
    type: "3D",
    props: ["desk", "sofa", "lamp", "plant"],
    lighting: "warm",
  },
};
