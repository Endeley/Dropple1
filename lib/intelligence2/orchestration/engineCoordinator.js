export function coordinateEngines(pipeline = []) {
  return pipeline.map((step, i) => ({
    ...step,
    assignedEngine: i % 2 === 0 ? "render" : "animation",
    status: "in_progress",
  }));
}
