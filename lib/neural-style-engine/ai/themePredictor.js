export function predictTheme(input = {}) {
  return { theme: "neon", source: input.type || "generic" };
}
