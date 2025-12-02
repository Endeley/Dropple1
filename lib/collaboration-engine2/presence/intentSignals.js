export function signalIntent(userId, intent) {
  return { userId, intent, ts: Date.now() };
}
