const projectTimelines = new Map();

export function logProjectStep(projectId, step) {
  if (!projectTimelines.has(projectId)) projectTimelines.set(projectId, []);
  projectTimelines.get(projectId).push({ step, ts: Date.now() });
}

export function getProjectTimeline(projectId) {
  return projectTimelines.get(projectId) || [];
}
