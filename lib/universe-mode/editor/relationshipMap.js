export function buildRelationshipMap(relations = []) {
  return { nodes: relations.length, graph: relations };
}
