"use client";

import { useRef } from "react";
import { useTemplateMasterStore } from "@/stores/useTemplateMasterStore";
import { useDragStateStore } from "@/stores/useDragStateStore";
import { useHoverStore } from "@/stores/useHoverStore";
import { captureBefore, captureAfter } from "@/canvas/core/history/historyCapture";

export function useSlotDrag(canvasScale = 1, definitionRef, snapGuides) {
  const store = useTemplateMasterStore;
  const dragRef = useRef({
    active: false,
    slotId: null,
    startX: 0,
    startY: 0,
    originalFrame: null,
  });

  const isDragging = () => dragRef.current.active;

  const onPointerDown = (event, slot) => {
    if (!slot) return;
    event.stopPropagation();

    const canvasEl = event.currentTarget?.closest("[data-template-canvas]");
    if (!canvasEl) return;

    const bounds = canvasEl.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / canvasScale;
    const y = (event.clientY - bounds.top) / canvasScale;

    captureBefore({
      category: "transform",
      label: "Move",
      slotId: slot.id,
    });

    dragRef.current = {
      active: true,
      slotId: slot.id,
      startX: x,
      startY: y,
      originalFrame: { ...slot.frame },
    };

    const hoverStore = useHoverStore.getState();
    hoverStore.suppress();
    hoverStore.clearHover();
    useDragStateStore.getState().setDragging(true, {
      type: "slot",
      slotId: slot.id,
    });

    window.addEventListener("pointermove", onWindowPointerMove);
    window.addEventListener("pointerup", onWindowPointerUp);
  };

  const onWindowPointerMove = (event) => {
    if (!dragRef.current.active) return;
    const { slotId, startX, startY, originalFrame } = dragRef.current;
    if (!slotId || !originalFrame) return;

    const canvasEl = document.querySelector("[data-template-canvas]");
    if (!canvasEl) return;
    const bounds = canvasEl.getBoundingClientRect();

    const x = (event.clientX - bounds.left) / canvasScale;
    const y = (event.clientY - bounds.top) / canvasScale;

    const dx = x - startX;
    const dy = y - startY;

    let nextFrame = {
      x: originalFrame.x + dx,
      y: originalFrame.y + dy,
    };

    if (snapGuides?.applySnap) {
      nextFrame = snapGuides.applySnap(slotId, nextFrame);
    }

    store.getState().updateSlotFrame(slotId, nextFrame);
  };

  const onWindowPointerUp = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;

    snapGuides?.clearGuides?.();
    useHoverStore.getState().unsuppress();
    useDragStateStore.getState().setDragging(false);
    captureAfter({ label: "Move", category: "transform" });

    window.removeEventListener("pointermove", onWindowPointerMove);
    window.removeEventListener("pointerup", onWindowPointerUp);
  };

  const onPointerMove = (event, snapGuides) => {
    // snap guides handled inside hook via closure
  };

  const onPointerUp = () => {
    // cleanup handled in window pointer up
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    isDragging,
  };
}
