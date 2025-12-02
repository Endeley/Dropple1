export function retrieveRelevant(memories = [], query = "") {
  return memories.filter((m) => JSON.stringify(m).toLowerCase().includes(query.toLowerCase()));
}
