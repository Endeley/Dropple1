"use client";

import { useCallback, useEffect, useRef } from "react";
import { computeResize } from "./resizeMath";
import { HANDLE_DEFS } from "../resize/handleDefs";
import { useHoverStore } from "@/stores/useHoverStore";
import { useResizeStateStore } from "@/stores/useResizeStateStore";
import { captureBefore, captureAfter } from "@/canvas/core/history/historyCapture";

export function useResizeHandles(
  definitionRef,
  canvasScale = 1,
  activeSlotId,
  updateSlotFrame,
  snapGuides
) {
  const stateRef = useRef({
    active: false,
    slotId: null,
    handle: null,
    startX: 0,
    startY: 0,
    startFrame: null,
    canvasBounds: null,
    snapGuides: null,
    lockAspect: false,
    fromCenter: false,
  });

  const handlePointerMove = useCallback(
    (event) => {
      const state = stateRef.current;
      if (!state.active || !state.startFrame || !state.canvasBounds) return;
      if (!HANDLE_DEFS[state.handle]) return;

      const x = (event.clientX - state.canvasBounds.left) / canvasScale;
      const y = (event.clientY - state.canvasBounds.top) / canvasScale;
      const dx = x - state.startX;
      const dy = y - state.startY;

      const nextFrame = computeResize(state.startFrame, state.handle, dx, dy, {
        lockAspectRatio: event.shiftKey || state.lockAspect,
        scaleFromCenter: event.altKey || state.fromCenter,
      });
      if (!nextFrame) return;

      let finalFrame = nextFrame;
      const guides = state.snapGuides;
      if (guides?.applySnap) {
        const snapped = guides.applySnap(state.slotId, nextFrame, {
          mode: "resize",
          handle: HANDLE_DEFS[state.handle],
        });
        if (snapped) {
          finalFrame = { ...nextFrame, ...snapped };
        }
      }

      updateSlotFrame(state.slotId, finalFrame);
    },
    [canvasScale, updateSlotFrame]
  );

  const handlePointerUp = useCallback(() => {
    if (!stateRef.current.active) return;
    const guides = stateRef.current.snapGuides;
    guides?.clearGuides?.();
    stateRef.current.active = false;
    useHoverStore.getState().unsuppress();
    useResizeStateStore.getState().setResizing(false);
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
    captureAfter({ label: "Resize", category: "transform" });
  }, [handlePointerMove]);

  const onPointerDown = useCallback(
    (event, handle) => {
      if (!activeSlotId || !definitionRef.current || !handle) return;
      if (!HANDLE_DEFS[handle]) return;
      const slot = (definitionRef.current.slots || []).find((s) => s.id === activeSlotId);
      if (!slot) return;

      const canvasEl = event.currentTarget?.closest("[data-template-canvas]");
      if (!canvasEl) return;
      const bounds = canvasEl.getBoundingClientRect();

      const startX = (event.clientX - bounds.left) / canvasScale;
      const startY = (event.clientY - bounds.top) / canvasScale;

      event.preventDefault();
      event.stopPropagation();

      captureBefore({
        category: "transform",
        label: "Resize",
        handle,
        slotId: slot.id,
      });

      stateRef.current = {
        active: true,
        slotId: slot.id,
        handle,
        startX,
        startY,
        startFrame: { ...slot.frame },
        canvasBounds: bounds,
        snapGuides,
        lockAspect: event.shiftKey,
        fromCenter: event.altKey,
      };

      const hoverStore = useHoverStore.getState();
      hoverStore.suppress();
      hoverStore.clearHover();
      useResizeStateStore.getState().setResizing(true, {
        id: handle,
        cursor: HANDLE_DEFS[handle]?.cursor,
      });

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    },
    [activeSlotId, canvasScale, definitionRef, handlePointerMove, handlePointerUp, snapGuides]
  );

  const isResizing = useCallback(() => stateRef.current.active, []);

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return {
    onPointerDown,
    isResizing,
  };
}
