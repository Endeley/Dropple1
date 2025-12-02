// Proximity detector stub
export const isWithinDistance = (a, b, maxDist = 10) => {
  const dx = (a.x || 0) - (b.x || 0);
  const dy = (a.y || 0) - (b.y || 0);
  const dz = (a.z || 0) - (b.z || 0);
  const distSq = dx * dx + dy * dy + dz * dz;
  return distSq <= maxDist * maxDist;
};
