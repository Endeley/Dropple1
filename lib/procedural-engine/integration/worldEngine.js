export function sendWorldToEngine(world) {
  return { worldId: world.id, status: "sent" };
}
