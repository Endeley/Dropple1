export function createRenderJob({ sceneId, frames = 10, resolution = "1080p", format = "png" }) {
  return {
    id: `job_${Math.random().toString(36).slice(2, 8)}`,
    sceneId,
    frames,
    resolution,
    format,
    status: "queued",
    createdAt: Date.now(),
  };
}

export function assignNodes(job, nodes = 4) {
  return { ...job, nodes, status: "rendering" };
}

export function completeJob(job) {
  return { ...job, status: "completed", completedAt: Date.now() };
}
