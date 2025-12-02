export function buildWeb({ env = "production" } = {}) {
  return {
    ok: true,
    target: "web",
    env,
    artifacts: ["dist/web"],
    note: "Web build placeholder",
  };
}
