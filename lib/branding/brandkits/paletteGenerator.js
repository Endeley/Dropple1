export function generatePalette(seed = "#8B5CF6") {
  return {
    primary: [seed, "#22d3ee", "#0b0b12"],
    secondary: ["#f472b6", "#fb7185"],
    neutrals: ["#0f172a", "#1f2937", "#e5e7eb"],
    gradients: [[seed, "#22d3ee"]],
  };
}
