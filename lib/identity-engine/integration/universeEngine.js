export function anchorIdentityInUniverse(identity, universeId) {
  return { identity: identity.userId, universeId, anchored: true };
}
