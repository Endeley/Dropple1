const threads = [];

export function createThread(targetId, authorId, text) {
  const t = { id: `thread_${Math.random().toString(36).slice(2, 8)}`, targetId, authorId, text, replies: [] };
  threads.push(t);
  return t;
}

export function replyThread(threadId, authorId, text) {
  const t = threads.find((th) => th.id === threadId);
  if (!t) return null;
  t.replies.push({ authorId, text, ts: Date.now() });
  return t;
}

export function listThreads(targetId) {
  return threads.filter((t) => t.targetId === targetId);
}
