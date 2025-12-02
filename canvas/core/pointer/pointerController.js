"use client";

import { hitTestSlots } from "@/canvas/core/hitTest/hitTestSlots";
import { HANDLE_DEFS } from "@/canvas/core/resize/handleDefs";

const HANDLE_POINTS = Object.entries(HANDLE_DEFS).map(([id, def]) => ({
  id,
  x: (def.x + 1) / 2,
  y: (def.y + 1) / 2,
}));

export function createPointerController({
  templateRef,
  definitionRef,
  selectionStore,
  onSlotDown,
  onBackgroundDown,
  onHandleDown,
}) {
  const isSlotSelected = (slotId) => {
    if (!selectionStore) return false;
    return selectionStore.getState().selected.includes(slotId);
  };

  const hitTestResizeHandle = (slot, x, y, scale = 1) => {
    if (!slot?.frame) return null;
    const HANDLE_SIZE = 12 / scale;
    const { frame } = slot;
    const handles = HANDLE_POINTS.map((handle) => ({
      id: handle.id,
      x: frame.x + handle.x * frame.width,
      y: frame.y + handle.y * frame.height,
    }));

    for (const handle of handles) {
      if (
        Math.abs(x - handle.x) <= HANDLE_SIZE &&
        Math.abs(y - handle.y) <= HANDLE_SIZE
      ) {
        return handle.id;
      }
    }

    return null;
  };

  const handlePointerDown = (event, scale = 1) => {
    if (!templateRef.current) return;

    const hit = hitTestSlots(event, definitionRef.current, scale);

    if (hit) {
      const bounds = templateRef.current.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / scale;
      const y = (event.clientY - bounds.top) / scale;

      if (isSlotSelected(hit.id)) {
        const handle = hitTestResizeHandle(hit.slot, x, y, scale);
        if (handle) {
          onHandleDown?.(event, hit.id, handle);
          return;
        }
      }

      onSlotDown?.(event, hit.id, hit.slot);
      return;
    }

    onBackgroundDown?.(event);
  };

  return {
    onPointerDown: handlePointerDown,
  };
}
