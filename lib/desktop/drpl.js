import { isDesktop, desktopAPI } from "./client";

const encoder = typeof window !== "undefined" ? window.btoa : null;
const decoder = typeof window !== "undefined" ? window.atob : null;

export async function saveDRPL(projectData) {
  if (!isDesktop) throw new Error("Desktop API unavailable");
  const json = JSON.stringify(projectData);
  const payload = encoder ? encoder(json) : Buffer.from(json).toString("base64");
  return desktopAPI.saveFile(payload);
}

export async function loadDRPL() {
  if (!isDesktop) throw new Error("Desktop API unavailable");
  const content = await desktopAPI.openFile();
  if (!content) return null;
  const decoded = decoder ? decoder(content) : Buffer.from(content, "base64").toString();
  return JSON.parse(decoded);
}
