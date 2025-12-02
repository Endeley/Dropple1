"use client";

/**
 * Hit-test the template's slots based on pointer coordinates.
 *
 * @param {PointerEvent} event
 * @param {Object} definition - template definition (with slots array)
 * @param {number} scale - canvas scale
 *
 * @returns {{ id: string, slot: object } | null}
 */
export function hitTestSlots(event, definition, scale = 1) {
  if (!definition || !definition.slots) return null;

  const canvasEl = event.currentTarget;
  if (!canvasEl) return null;

  const bounds = canvasEl.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / scale;
  const y = (event.clientY - bounds.top) / scale;

  const ordered = [...definition.slots]
    .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
    .reverse();

  for (const slot of ordered) {
    if (slot.hidden || slot.visible === false) continue;
    const frame = slot.frame;
    if (!frame) continue;

    const inside =
      x >= frame.x &&
      y >= frame.y &&
      x <= frame.x + frame.width &&
      y <= frame.y + frame.height;

    if (inside) {
      return {
        id: slot.id,
        slot,
      };
    }
  }

  return null;
}
