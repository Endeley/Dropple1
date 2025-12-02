const personaStyles = new Map();

export function setPersonaStyle(personaId, embedding) {
  personaStyles.set(personaId, embedding);
}

export function getPersonaStyle(personaId) {
  return personaStyles.get(personaId);
}
