"use client";

import { useRef } from "react";
import { useTemplateMasterStore } from "@/stores/useTemplateMasterStore";
import { useSnapGuides } from "../snap/useSnapGuides";

export function useSlotDrag(canvasScale = 1, definitionRef) {
  const store = useTemplateMasterStore;
  const { guides, applySnapping, clearGuides } = useSnapGuides(definitionRef);
  const dragState = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    originalFrame: null,
  });

  const onPointerMove = (event) => {
    if (!dragState.current.dragging) return;
    const activeSlotId = store.getState().activeSlotId;
    if (!activeSlotId) return;
    const dx = (event.clientX - dragState.current.startX) / canvasScale;
    const dy = (event.clientY - dragState.current.startY) / canvasScale;
    const { originalFrame } = dragState.current;
    const snapped = applySnapping(
      {
        x: originalFrame.x + dx,
        y: originalFrame.y + dy,
        width: originalFrame.width,
        height: originalFrame.height,
      },
      activeSlotId
    );

    store.getState().updateSlotFrame(activeSlotId, snapped);
  };

  const onPointerUp = () => {
    dragState.current.dragging = false;
    clearGuides();
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  };

  const onPointerDown = (event, slot) => {
    if (event.target?.dataset?.handle) return;
    if (!slot) return;
    event.stopPropagation();
    dragState.current = {
      dragging: true,
      startX: event.clientX,
      startY: event.clientY,
      originalFrame: { ...slot.frame },
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  return { onPointerDown, guides };
}
