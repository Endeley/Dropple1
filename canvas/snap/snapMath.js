export function snapValue(value, targets, threshold) {
  if (!Array.isArray(targets) || targets.length === 0) return value;

  let closest = value;
  let minDist = Infinity;

  for (const target of targets) {
    const dist = Math.abs(value - target);
    if (dist < threshold && dist < minDist) {
      closest = target;
      minDist = dist;
    }
  }

  return closest;
}

export function getMidpoint(position, size) {
  return position + size / 2;
}
