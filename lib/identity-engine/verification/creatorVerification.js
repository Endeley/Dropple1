export function verifyCreator(userId, proof = {}) {
  return { userId, verified: true, proof, ts: Date.now() };
}
