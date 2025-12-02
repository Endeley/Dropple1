export function detectPlatform() {
  if (typeof window !== "undefined") {
    if (navigator.userAgent.includes("Electron")) return "desktop";
    if ("standalone" in navigator && navigator.standalone) return "pwa";
    return "web";
  }
  return "server";
}
