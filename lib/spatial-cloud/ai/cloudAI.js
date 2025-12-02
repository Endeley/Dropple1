export function runCloudAI(task = "gen") {
  return { task, status: "running", jobId: `cloudai_${Math.random().toString(36).slice(2, 8)}` };
}
