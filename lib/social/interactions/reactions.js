const reactions = [];

export function react(postId, userId, type = "like") {
  const r = { postId, userId, type, ts: Date.now() };
  reactions.push(r);
  return r;
}

export function getReactions(postId) {
  return reactions.filter((r) => r.postId === postId);
}
