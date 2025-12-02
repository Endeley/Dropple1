export function buildPWA({ env = "production" } = {}) {
  return {
    ok: true,
    target: "pwa",
    env,
    artifacts: ["dist/pwa"],
    note: "PWA build placeholder",
  };
}
