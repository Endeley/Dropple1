// Collision detection placeholder
export const detectCollision = (a, b) => {
  if (!a || !b) return false;
  const ax = a.x || 0;
  const ay = a.y || 0;
  const bx = b.x || 0;
  const by = b.y || 0;
  const aw = a.width || 0;
  const ah = a.height || 0;
  const bw = b.width || 0;
  const bh = b.height || 0;
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
};
