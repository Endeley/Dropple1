export function harmonizeUniverseStyle(universe = {}, style = {}) {
  return { universeId: universe.id, styleApplied: !!style };
}
