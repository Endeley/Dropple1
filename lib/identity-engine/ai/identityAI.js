export function summarizeIdentity(identity = {}) {
  return { personas: (identity.personas || []).length, avatar: identity.avatar?.id || null };
}
