export function simulateHandPhysics(hands = []) {
  return hands.map((h) => ({ ...h, simulated: true }));
}
