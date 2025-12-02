export function worldToScreen(x, y, zoom, offset) {
  return {
    x: (x + offset.x) * zoom,
    y: (y + offset.y) * zoom,
  };
}

export function screenToWorld(screenX, screenY, zoom, offset) {
  return {
    x: screenX / zoom - offset.x,
    y: screenY / zoom - offset.y,
  };
}
