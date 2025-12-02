export function createCharacter(name, attrs = {}) {
  return { id: `char_${Math.random().toString(36).slice(2, 8)}`, name, attrs, memories: [] };
}
