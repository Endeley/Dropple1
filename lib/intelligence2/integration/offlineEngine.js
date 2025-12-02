export function flagOffline(plan = []) {
  const offlineReady = plan.length < 15;
  return { offlineReady, note: offlineReady ? "Can run locally" : "Needs cloud" };
}
