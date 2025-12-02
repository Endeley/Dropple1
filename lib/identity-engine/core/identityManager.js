const identities = new Map();

export function createIdentity(userId, base = {}) {
  const id = { userId, base, personas: [], createdAt: Date.now() };
  identities.set(userId, id);
  return id;
}

export function getIdentity(userId) {
  return identities.get(userId);
}

export function switchPersona(userId, personaId) {
  const id = identities.get(userId);
  if (!id) return null;
  id.activePersona = personaId;
  return id;
}
