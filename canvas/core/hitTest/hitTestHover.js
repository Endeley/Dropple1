export function hitTestHover(event, definition, scale = 1) {
  if (!definition?.slots?.length) return null;

  const target = event.currentTarget;
  if (!target) return null;

  const bounds = target.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / scale;
  const y = (event.clientY - bounds.top) / scale;

  for (let i = definition.slots.length - 1; i >= 0; i -= 1) {
    const slot = definition.slots[i];
    const frame = slot?.frame;
    if (!frame) continue;

    const withinX = x >= frame.x && x <= frame.x + frame.width;
    const withinY = y >= frame.y && y <= frame.y + frame.height;
    if (withinX && withinY) {
      return slot;
    }
  }

  return null;
}
