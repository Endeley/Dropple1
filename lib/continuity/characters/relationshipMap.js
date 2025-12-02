export function createRelationshipMap() {
  return { links: [] };
}

export function addRelationship(map, from, to, relation, weight = 0.5) {
  return { ...map, links: [...map.links, { from, to, relation, weight }] };
}
