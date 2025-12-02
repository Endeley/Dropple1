export function analyzeStyle(input = {}) {
  return {
    palette: ["#8B5CF6", "#EC4899"],
    layout: "grid-heavy",
    tone: "vibrant",
    embedding: Array(8).fill(0.1),
    source: input.type || "generic",
  };
}
