const hints = [];

export function addHint(text) {
  hints.push({ text, ts: Date.now() });
  if (hints.length > 50) hints.shift();
}

export function getHints() {
  return hints.slice(-5);
}

export function clearHints() {
  hints.length = 0;
}
