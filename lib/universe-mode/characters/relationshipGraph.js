const relations = [];

export function addRelationship(a, b, type = "ally") {
  relations.push({ a, b, type });
}

export function listRelationships(id) {
  return relations.filter((r) => r.a === id || r.b === id);
}
