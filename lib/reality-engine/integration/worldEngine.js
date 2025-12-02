export function blendWorlds(realWorld = {}, virtualWorld = {}) {
  return { blended: true, real: !!realWorld, virtual: !!virtualWorld };
}
