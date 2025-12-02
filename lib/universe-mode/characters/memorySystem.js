export function addMemory(character, memory) {
  character.memories = character.memories || [];
  character.memories.push({ memory, ts: Date.now() });
  return character;
}
