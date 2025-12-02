export function classifyAesthetic(input = {}) {
  return { label: "modern", confidence: 0.7, source: input.type || "generic" };
}
