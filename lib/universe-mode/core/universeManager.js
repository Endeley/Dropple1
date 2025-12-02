const universes = [];

export function createUniverse(name = "Universe") {
  const uni = { id: `uni_${Math.random().toString(36).slice(2, 8)}`, name, worlds: [], lore: [] };
  universes.push(uni);
  return uni;
}

export function listUniverses() {
  return universes;
}
