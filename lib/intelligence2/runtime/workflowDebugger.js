export function debugWorkflow(pipeline = []) {
  const missing = pipeline.filter((p) => p.status === "error");
  return { issues: missing.map((m) => m.action), status: missing.length ? "needs_fix" : "clean" };
}
