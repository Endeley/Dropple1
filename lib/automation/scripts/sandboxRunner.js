export function runSandbox(fn, context = {}) {
  try {
    return { ok: true, result: fn(context) };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
