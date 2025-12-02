export function autoFix(issue = "unknown") {
  return { issue, fixed: true, note: "Auto repair applied" };
}
