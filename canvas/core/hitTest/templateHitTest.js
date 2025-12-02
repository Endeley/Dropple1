// canvas/core/hitTest/templateHitTest.js

/**
 * Slot-aware hit-test.
 *
 * @param {object[]} templateInstances - array of template instances on canvas
 * @param {number} x - pointer X (canvas space)
 * @param {number} y - pointer Y (canvas space)
 * @returns {null | { type: "template-slot", instanceId, slotId }}
 */
export function hitTestTemplateSlots(templateInstances, x, y) {
  if (!templateInstances) return null;

  // Loop from top → down so higher items get priority
  for (let i = templateInstances.length - 1; i >= 0; i--) {
    const instance = templateInstances[i];
    const { id: instanceId, slots, transform } = instance;
    if (!slots) continue;

    // Transform pointer into instance local space
    const localX = (x - transform.x) / transform.scale;
    const localY = (y - transform.y) / transform.scale;

    for (const slot of slots) {
      const { id: slotId, frame } = slot;
      if (!frame) continue;

      const inside =
        localX >= frame.x &&
        localX <= frame.x + frame.width &&
        localY >= frame.y &&
        localY <= frame.y + frame.height;

      if (inside) {
        return {
          type: "template-slot",
          instanceId,
          slotId,
        };
      }
    }
  }

  return null;
}
