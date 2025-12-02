export function requestAICompute(model = "default") {
  return { model, jobId: `ai_${Math.random().toString(36).slice(2, 8)}`, status: "queued" };
}
