export function pointInRotatedRect(px, py, rect) {
  const { x, y, width, height, rotation = 0 } = rect;
  const cx = x + width / 2;
  const cy = y + height / 2;
  const radians = (-rotation * Math.PI) / 180;

  const dx = px - cx;
  const dy = py - cy;

  const rx = dx * Math.cos(radians) - dy * Math.sin(radians);
  const ry = dx * Math.sin(radians) + dy * Math.cos(radians);

  return rx > -width / 2 && rx < width / 2 && ry > -height / 2 && ry < height / 2;
}
