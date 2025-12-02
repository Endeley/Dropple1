export function on(event, handler) {
  return { event, handler };
}

export function sequence(steps = []) {
  return steps;
}

export function runScript(script, payload = {}) {
  return script
    .filter((s) => s.event === payload.event)
    .map((s) => {
      try {
        s.handler(payload.data);
        return { event: s.event, status: "ok" };
      } catch (err) {
        return { event: s.event, status: "error", error: err.message };
      }
    });
}
