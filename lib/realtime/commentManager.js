import { publish, subscribe } from "./bus";
import { EVENT_TYPES } from "./eventTypes";

const comments = new Map(); // docId -> array

export function listComments(docId) {
  return comments.get(docId) || [];
}

export function addComment(docId, payload) {
  const arr = comments.get(docId) || [];
  const comment = {
    id: payload.id || `cmt_${Date.now()}`,
    layerId: payload.layerId || null,
    author: payload.author,
    text: payload.text,
    replies: [],
    resolved: false,
    createdAt: Date.now(),
  };
  arr.push(comment);
  comments.set(docId, arr);
  publish(EVENT_TYPES.COMMENT_ADD, { docId, comment });
  return comment;
}

export function replyToComment(docId, commentId, reply) {
  const arr = comments.get(docId) || [];
  const target = arr.find((c) => c.id === commentId);
  if (!target) return null;
  const rep = { ...reply, createdAt: Date.now() };
  target.replies.push(rep);
  publish(EVENT_TYPES.COMMENT_REPLY, { docId, comment: target });
  return rep;
}

export function resolveComment(docId, commentId, resolved = true) {
  const arr = comments.get(docId) || [];
  const target = arr.find((c) => c.id === commentId);
  if (!target) return null;
  target.resolved = resolved;
  publish(EVENT_TYPES.COMMENT_RESOLVE, { docId, comment: target });
  return target;
}

export function onComments(event, callback) {
  return subscribe(event, callback);
}
