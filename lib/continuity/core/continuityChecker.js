export function checkContinuity({ canon, timeline }) {
  // Placeholder: returns no issues.
  return {
    ok: true,
    issues: [],
    characters: Object.keys(canon?.characters || {}).length,
    events: Object.keys(canon?.events || {}).length,
    timelineEvents: timeline?.events?.length || 0,
  };
}
