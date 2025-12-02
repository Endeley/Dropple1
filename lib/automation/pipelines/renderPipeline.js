export function buildRenderPipeline(steps = []) {
  return steps.length ? steps : ["preprocess", "effects", "tone", "export"];
}

export function runRenderPipeline(pipeline, ctx = {}) {
  return pipeline.map((step) => ({ step, status: "done", ctx }));
}
