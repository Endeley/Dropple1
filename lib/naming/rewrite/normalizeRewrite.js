export function normalizeRewrite(data = {}) {
  return {
    rewritten: `${data.rewritten || ""}`.trim(),
    explanation: `${data.explanation || ""}`.trim(),
  };
}
