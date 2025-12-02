export function getBoundingBox(layer) {
  return {
    x: layer.x || 0,
    y: layer.y || 0,
    width: layer.width || 0,
    height: layer.height || 0,
    rotation: layer.rotation || 0,
  };
}

export function applyResize(box, handle, dx, dy) {
  let { x, y, width, height } = box;

  if (handle.x === -1) {
    x += dx;
    width -= dx;
  } else if (handle.x === 1) {
    width += dx;
  }

  if (handle.y === -1) {
    y += dy;
    height -= dy;
  } else if (handle.y === 1) {
    height += dy;
  }

  width = Math.max(10, width);
  height = Math.max(10, height);

  return { x, y, width, height };
}

export function applyRotation(box, cx, cy, px, py) {
  const angle = Math.atan2(py - cy, px - cx);
  return (angle * 180) / Math.PI;
}
