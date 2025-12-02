export function secureWebSocketMessage(payload, token) {
  // Placeholder signing: attach token as proof-of-auth.
  return { ...payload, signedBy: token };
}
