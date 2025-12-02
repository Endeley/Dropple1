export function generateSkybox({ mood = "day" } = {}) {
  return { mood, colors: mood === "night" ? ["#0b0b2b", "#1a1a3a"] : ["#87ceeb", "#f5f7fa"] };
}
