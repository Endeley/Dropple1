export function checkContinuity({ graph, events = [] }) {
  // Placeholder: always ok.
  return {
    ok: true,
    issues: [],
    nodes: graph?.nodes?.length || 0,
    edges: graph?.edges?.length || 0,
    eventsChecked: events.length,
  };
}
