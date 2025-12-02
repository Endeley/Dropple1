export function interpolatePoints(p1, p2, spacing) {
  const points = [];
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dist = Math.hypot(dx, dy);
  const steps = Math.floor(dist / spacing) || 1;
  for (let i = 0; i <= steps; i++) {
    points.push({
      x: p1.x + (dx * i) / steps,
      y: p1.y + (dy * i) / steps,
    });
  }
  return points;
}
