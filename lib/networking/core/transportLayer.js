export function createTransport({ url, mode = "ws" }) {
  return {
    id: `transport_${Math.random().toString(36).slice(2, 8)}`,
    url,
    mode,
    status: "disconnected",
  };
}

export function connect(transport) {
  // Placeholder: would create WebSocket / WebRTC connection.
  return { ...transport, status: "connected" };
}

export function send(transport, packet) {
  if (transport.status !== "connected") return { ok: false };
  return { ok: true, packet };
}
