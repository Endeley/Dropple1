const decisions = [];

export function logDecision(projectId, decision) {
  decisions.push({ projectId, decision, ts: Date.now() });
}

export function listDecisions(projectId) {
  return decisions.filter((d) => d.projectId === projectId);
}
