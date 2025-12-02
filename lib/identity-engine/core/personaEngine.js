export function addPersona(identity, persona) {
  identity.personas = identity.personas || [];
  identity.personas.push(persona);
  return persona;
}

export function listPersonas(identity) {
  return identity.personas || [];
}
