export function buildDesktop({ env = "production" } = {}) {
  return {
    ok: true,
    target: "desktop",
    env,
    artifacts: ["dist/desktop"],
    note: "Desktop build placeholder (Electron)",
  };
}
