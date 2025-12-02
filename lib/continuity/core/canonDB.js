export function createCanonDB() {
  return {
    characters: {},
    locations: {},
    items: {},
    events: {},
    rules: [],
  };
}

export function addCharacter(db, character) {
  const next = { ...db.characters, [character.id]: character };
  return { ...db, characters: next };
}

export function addEvent(db, event) {
  const next = { ...db.events, [event.id]: event };
  return { ...db, events: next };
}
