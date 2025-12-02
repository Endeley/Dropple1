export function buildMobile({ env = "production" } = {}) {
  return {
    ok: true,
    target: "mobile",
    env,
    artifacts: ["dist/mobile"],
    note: "Mobile build placeholder (React Native/Capacitor)",
  };
}
