export function computeGroupFrame(slots = []) {
  if (!slots.length) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  const xs = slots.map((s) => s.frame.x);
  const ys = slots.map((s) => s.frame.y);
  const rights = slots.map((s) => s.frame.x + s.frame.width);
  const bottoms = slots.map((s) => s.frame.y + s.frame.height);

  const left = Math.min(...xs);
  const top = Math.min(...ys);
  const right = Math.max(...rights);
  const bottom = Math.max(...bottoms);

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
}
