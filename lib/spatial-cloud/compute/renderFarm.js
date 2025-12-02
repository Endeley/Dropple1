export function submitRender(job = {}) {
  return { jobId: `render_${Math.random().toString(36).slice(2, 8)}`, status: "queued", job };
}
