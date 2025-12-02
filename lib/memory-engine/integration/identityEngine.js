export function personalizeForIdentity(identity, prefs = {}) {
  return { identity: identity?.userId, prefs };
}
