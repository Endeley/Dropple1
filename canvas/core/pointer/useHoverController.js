"use client";

import { useCallback, useMemo } from "react";
import { useHoverStore } from "@/stores/useHoverStore";
import { HANDLE_DEFS } from "@/canvas/core/resize/handleDefs";
import { hitTestSlots } from "@/canvas/core/hitTest/hitTestSlots";

export const GROUP_HANDLE_ID = "__group__";
const HANDLE_HIT_SIZE = 8;

export function useHoverController({
  canvasRef,
  definitionRef,
  canvasScale = 1,
  selectedSlotIds = [],
  selectionFrame = null,
}) {
  const suppressed = useHoverStore((state) => state.suppressed);
  const setSlotHover = useHoverStore((state) => state.setSlotHover);
  const setHandleHover = useHoverStore((state) => state.setHandleHover);
  const setGroupHover = useHoverStore((state) => state.setGroupHover);
  const clearHover = useHoverStore((state) => state.clearHover);

  const pointerToCanvas = useCallback(
    (event) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return null;
      return {
        x: (event.clientX - rect.left) / canvasScale,
        y: (event.clientY - rect.top) / canvasScale,
      };
    },
    [canvasRef, canvasScale]
  );

  const handlePointerMove = useCallback(
    (event) => {
      if (suppressed) {
        clearHover();
        return;
      }

      const def = definitionRef.current;
      if (!def?.slots?.length) {
        clearHover();
        return;
      }

      const point = pointerToCanvas(event);
      if (!point) {
        clearHover();
        return;
      }

      const tolerance = HANDLE_HIT_SIZE / canvasScale;

      const checkHandlesOnFrame = (frame, slotId) => {
        if (!frame) return null;
        for (const [key, defHandle] of Object.entries(HANDLE_DEFS)) {
          const hx = frame.x + (frame.width * (defHandle.x + 1)) / 2;
          const hy = frame.y + (frame.height * (defHandle.y + 1)) / 2;
          if (
            Math.abs(hx - point.x) <= tolerance &&
            Math.abs(hy - point.y) <= tolerance
          ) {
            return { slotId, handle: key, def: defHandle };
          }
        }
        return null;
      };

      let handleHit = null;
      if (selectedSlotIds.length === 1) {
        const slot = def.slots.find((s) => s.id === selectedSlotIds[0]);
        handleHit = slot ? checkHandlesOnFrame(slot.frame, slot.id) : null;
      } else if (selectedSlotIds.length > 1 && selectionFrame) {
        handleHit = checkHandlesOnFrame(selectionFrame, GROUP_HANDLE_ID);
      }

      if (!handleHit && selectedSlotIds.length > 1) {
        // check individual slots in multi selection for their handles
        const selectedSlots = def.slots.filter((slot) =>
          selectedSlotIds.includes(slot.id)
        );
        for (const slot of selectedSlots) {
          handleHit = checkHandlesOnFrame(slot.frame, slot.id);
          if (handleHit) break;
        }
      }

      if (handleHit) {
        setHandleHover(handleHit);
        return;
      }

      let groupHit = null;
      if (selectedSlotIds.length > 1 && selectionFrame) {
        const f = selectionFrame;
        if (
          point.x >= f.x &&
          point.x <= f.x + f.width &&
          point.y >= f.y &&
          point.y <= f.y + f.height
        ) {
          groupHit = "selection-group";
        }
      }

      if (groupHit) {
        setGroupHover(groupHit);
        return;
      }

      const slotHit = hitTestSlots(event, def, canvasScale);
      if (slotHit?.id) {
        setSlotHover(slotHit.id, slotHit.slot?.type);
        return;
      }

      clearHover();
    },
    [
      canvasScale,
      clearHover,
      definitionRef,
      pointerToCanvas,
      selectedSlotIds,
      selectionFrame,
      setGroupHover,
      setHandleHover,
      setSlotHover,
      suppressed,
    ]
  );

  const handlePointerLeave = useCallback(() => {
    clearHover();
  }, [clearHover]);

  return useMemo(
    () => ({
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
    }),
    [handlePointerLeave, handlePointerMove]
  );
}
