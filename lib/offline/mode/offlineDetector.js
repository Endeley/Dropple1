export function detectOffline() {
  if (typeof navigator === "undefined") return false;
  return !navigator.onLine;
}
