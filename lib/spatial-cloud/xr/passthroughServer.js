export function startPassthrough(sessionId) {
  return { sessionId, status: "passthrough_on" };
}
