export function snapRotation(angle, threshold = 4) {
  const targets = [0, 45, 90, 135, 180, 225, 270, 315, 360];
  let closest = angle;
  let minDist = Infinity;

  targets.forEach((target) => {
    const dist = Math.abs(target - angle);
    if (dist < threshold && dist < minDist) {
      closest = target;
      minDist = dist;
    }
  });

  return closest;
}
