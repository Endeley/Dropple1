export function attachCommerceIdentity(identity, commerceId) {
  return { identity: identity.userId, commerceId, attached: true };
}
