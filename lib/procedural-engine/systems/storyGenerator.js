export function generateStory({ theme = "adventure" } = {}) {
  return { theme, beats: ["intro", "conflict", "resolution"] };
}
