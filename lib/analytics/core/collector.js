const buffer = [];

export function logEvent(name, payload) {
  buffer.push({ name, payload, ts: Date.now() });
  if (buffer.length > 1000) buffer.shift();
  return buffer;
}

export function getBuffer() {
  return [...buffer];
}
