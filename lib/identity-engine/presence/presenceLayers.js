export function buildPresence(identity) {
  return {
    canvas: true,
    world: !!identity?.universe,
    xr: !!identity?.xr,
  };
}
