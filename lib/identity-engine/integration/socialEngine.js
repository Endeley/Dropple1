export function syncIdentityToSocial(identity) {
  return { synced: true, name: identity.base?.name || "unknown" };
}
