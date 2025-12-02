export function encodeChange(change) {
  return JSON.stringify({ ...change, ts: Date.now() });
}

export function decodeChange(raw = "{}") {
  try {
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}
