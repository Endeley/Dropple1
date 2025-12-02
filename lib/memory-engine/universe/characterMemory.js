const charMem = new Map();

export function rememberCharacter(charId, event) {
  if (!charMem.has(charId)) charMem.set(charId, []);
  charMem.get(charId).push({ event, ts: Date.now() });
}

export function getCharacterMemories(charId) {
  return charMem.get(charId) || [];
}
