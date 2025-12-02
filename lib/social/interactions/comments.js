const comments = [];

export function addComment(postId, userId, text) {
  const c = { id: `c_${Math.random().toString(36).slice(2, 8)}`, postId, userId, text, createdAt: Date.now() };
  comments.push(c);
  return c;
}

export function listComments(postId) {
  return comments.filter((c) => c.postId === postId);
}
