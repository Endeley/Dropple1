const badges = new Map();

export function awardBadge(userId, badge) {
  if (!badges.has(userId)) badges.set(userId, new Set());
  badges.get(userId).add(badge);
}

export function listBadges(userId) {
  return Array.from(badges.get(userId) || []);
}
