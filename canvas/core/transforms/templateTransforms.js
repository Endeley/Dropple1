export function applyTransform(point, transform) {
  if (!transform) return point;
  const cos = Math.cos((transform.rotation * Math.PI) / 180);
  const sin = Math.sin((transform.rotation * Math.PI) / 180);

  const x =
    transform.x + point.x * transform.scale * cos - point.y * transform.scale * sin;

  const y =
    transform.y + point.x * transform.scale * sin + point.y * transform.scale * cos;

  return { x, y };
}

export function invertTransform(point, transform) {
  if (!transform) return point;
  const cos = Math.cos((transform.rotation * Math.PI) / 180);
  const sin = Math.sin((transform.rotation * Math.PI) / 180);

  const dx = point.x - transform.x;
  const dy = point.y - transform.y;

  return {
    x: (dx * cos + dy * sin) / transform.scale,
    y: (dy * cos - dx * sin) / transform.scale,
  };
}
