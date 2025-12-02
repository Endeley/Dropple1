"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { HANDLE_DEFS } from "../resize/handleDefs";
import { computeGroupFrame } from "@/canvas/core/grouping/groupMath";
import { useTemplateMasterStore } from "@/stores/useTemplateMasterStore";
import { useSlotSelectionStore } from "@/stores/useSlotSelectionStore";
import { computeResize } from "./resizeMath";
import { useHoverStore } from "@/stores/useHoverStore";
import { useResizeStateStore } from "@/stores/useResizeStateStore";
import { captureBefore, captureAfter } from "@/canvas/core/history/historyCapture";

export function useGroupResize(canvasScale = 1, definitionRef) {
  const dragRef = useRef({
    active: false,
    handle: null,
    startX: 0,
    startY: 0,
    originalGroupFrame: null,
    originalFrames: {},
    anchor: null,
    snapGuides: null,
  });

  const getSelectedSlots = () => {
    const selected = useSlotSelectionStore.getState().selected || [];
    const def = definitionRef.current;
    if (!def?.slots?.length || selected.length < 2) return [];
    return def.slots.filter((slot) => selected.includes(slot.id));
  };

  const handlePointerMove = useCallback(
    (event) => {
      const state = dragRef.current;
      if (!state.active || !state.originalGroupFrame) return;

      const bounds = document
        .querySelector("[data-template-canvas]")
        ?.getBoundingClientRect();
      if (!bounds) return;

      const x = (event.clientX - bounds.left) / canvasScale;
      const y = (event.clientY - bounds.top) / canvasScale;
      const dx = x - state.startX;
      const dy = y - state.startY;

      const nextFrame = computeResize(state.originalGroupFrame, state.handle, dx, dy, {
        minSize: 1,
        lockAspectRatio: event.shiftKey,
        scaleFromCenter: event.altKey,
      });
      if (!nextFrame) return;

      const guides = state.snapGuides;
      const snappedFrame =
        guides?.applySnapToGroup?.(nextFrame, state.originalGroupFrame) || nextFrame;

      const baseWidth = state.originalGroupFrame.width || 1;
      const baseHeight = state.originalGroupFrame.height || 1;
      const scaleX = snappedFrame.width / baseWidth;
      const scaleY = snappedFrame.height / baseHeight;

      const updateSlotFrame = useTemplateMasterStore.getState().updateSlotFrame;

      Object.entries(state.originalFrames).forEach(([slotId, frame]) => {
        const newX = state.anchor.x + (frame.x - state.anchor.x) * scaleX;
        const newY = state.anchor.y + (frame.y - state.anchor.y) * scaleY;
        const newW = Math.max(1, frame.width * scaleX);
        const newH = Math.max(1, frame.height * scaleY);

        updateSlotFrame(slotId, {
          x: newX,
          y: newY,
          width: newW,
          height: newH,
        });
      });
    },
    [canvasScale]
  );

  const stopResize = useCallback(() => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    dragRef.current.snapGuides?.clearGuides?.();
    useHoverStore.getState().unsuppress();
    useResizeStateStore.getState().setResizing(false);
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", stopResize);
    captureAfter({ label: "Group Resize", category: "transform" });
  }, [handlePointerMove]);

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopResize);
    };
  }, [handlePointerMove, stopResize]);

  const startGroupResize = useCallback(
    (event, handle) => {
      if (!handle || !HANDLE_DEFS[handle]) return;
      const slots = getSelectedSlots();
      if (slots.length < 2) return;

      const canvasEl = event.currentTarget?.closest("[data-template-canvas]");
      if (!canvasEl) return;
      const bounds = canvasEl.getBoundingClientRect();

      const startX = (event.clientX - bounds.left) / canvasScale;
      const startY = (event.clientY - bounds.top) / canvasScale;

      const groupFrame = computeGroupFrame(slots);
      const direction = HANDLE_DEFS[handle];
      const anchor = {
        x:
          direction.x === -1
            ? groupFrame.x + groupFrame.width
            : direction.x === 1
            ? groupFrame.x
            : groupFrame.x + groupFrame.width / 2,
        y:
          direction.y === -1
            ? groupFrame.y + groupFrame.height
            : direction.y === 1
            ? groupFrame.y
            : groupFrame.y + groupFrame.height / 2,
      };

      const frames = {};
      slots.forEach((slot) => {
        frames[slot.id] = { ...slot.frame };
      });

      event.preventDefault();
      event.stopPropagation();

      captureBefore({
        category: "transform",
        label: "Group Resize",
        handle,
      });

      dragRef.current = {
        active: true,
        handle,
        startX,
        startY,
        originalGroupFrame: { ...groupFrame },
        originalFrames: frames,
        anchor,
        snapGuides: dragRef.current.snapGuides,
      };

      const hoverStore = useHoverStore.getState();
      hoverStore.suppress();
      hoverStore.clearHover();
      useResizeStateStore.getState().setResizing(true, {
        id: handle,
        cursor: HANDLE_DEFS[handle]?.cursor,
      });

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", stopResize);
    },
    [canvasScale, handlePointerMove, stopResize]
  );

  const isActive = useCallback(() => dragRef.current.active, []);

  const setSnapGuides = useCallback((guides) => {
    dragRef.current.snapGuides = guides || null;
  }, []);

  return useMemo(
    () => ({
      startGroupResize,
      isActive,
      setSnapGuides,
    }),
    [startGroupResize, isActive, setSnapGuides]
  );
}
