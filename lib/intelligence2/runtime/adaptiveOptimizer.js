export function optimizePipeline(pipeline = []) {
  return pipeline.map((p) => ({
    ...p,
    optimized: true,
  }));
}
