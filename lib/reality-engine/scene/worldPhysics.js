export function applyWorldPhysics(objects = []) {
  return objects.map((o) => ({ ...o, simulated: true }));
}
