const communities = new Map();

export function addToCommunity(communityId, postId) {
  if (!communities.has(communityId)) communities.set(communityId, new Set());
  communities.get(communityId).add(postId);
}

export function listCommunity(communityId) {
  return Array.from(communities.get(communityId) || []);
}
