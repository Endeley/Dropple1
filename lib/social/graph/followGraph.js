const follows = new Map();

export function follow(userId, targetId) {
  if (!follows.has(userId)) follows.set(userId, new Set());
  follows.get(userId).add(targetId);
}

export function unfollow(userId, targetId) {
  follows.get(userId)?.delete(targetId);
}

export function getFollowing(userId) {
  return Array.from(follows.get(userId) || []);
}
