export function inferMood(input = {}) {
  return { mood: "energetic", source: input.type || "generic" };
}
