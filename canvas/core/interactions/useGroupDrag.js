"use client";

import { useRef } from "react";
import { useTemplateMasterStore } from "@/stores/useTemplateMasterStore";
import { useSlotSelectionStore } from "@/stores/useSlotSelectionStore";
import { computeGroupFrame } from "@/canvas/core/grouping/groupMath";
import { useHoverStore } from "@/stores/useHoverStore";
import { useDragStateStore } from "@/stores/useDragStateStore";
import { captureBefore, captureAfter } from "@/canvas/core/history/historyCapture";

export function useGroupDrag(canvasScale = 1, snapGuides) {
  const store = useTemplateMasterStore;
  const selection = useSlotSelectionStore;
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    selectedIds: [],
    originalFrames: {},
    groupFrame: null,
  });

  const isDragging = () => dragRef.current.active;

  const onPointerDown = (event) => {
    const ids = selection.getState().selected;
    if (!ids || ids.length < 2) return;
    event.stopPropagation();

    const definition = store.getState().definition;
    if (!definition) return;

    const slots = definition.slots.filter((slot) => ids.includes(slot.id));
    const groupFrame = computeGroupFrame(slots);

    const canvasEl = event.currentTarget?.closest("[data-template-canvas]");
    if (!canvasEl) return;
    const bounds = canvasEl.getBoundingClientRect();

    const x = (event.clientX - bounds.left) / canvasScale;
    const y = (event.clientY - bounds.top) / canvasScale;

    const originalFrames = {};
    slots.forEach((slot) => {
      originalFrames[slot.id] = { ...slot.frame };
    });

    captureBefore({
      category: "transform",
      label: "Move Group",
      slotIds: [...ids],
    });

    dragRef.current = {
      active: true,
      startX: x,
      startY: y,
      selectedIds: [...ids],
      originalFrames,
      groupFrame,
    };

    const hoverStore = useHoverStore.getState();
    hoverStore.suppress();
    hoverStore.clearHover();
    useDragStateStore.getState().setDragging(true, { type: "group" });

    window.addEventListener("pointermove", onWindowPointerMove);
    window.addEventListener("pointerup", onWindowPointerUp);
  };

  const onWindowPointerMove = (event) => {
    if (!dragRef.current.active) return;
    const { startX, startY, originalFrames, selectedIds, groupFrame } =
      dragRef.current;

    const canvasEl = document.querySelector("[data-template-canvas]");
    if (!canvasEl) return;
    const bounds = canvasEl.getBoundingClientRect();

    const x = (event.clientX - bounds.left) / canvasScale;
    const y = (event.clientY - bounds.top) / canvasScale;

    const dx = x - startX;
    const dy = y - startY;

    let nextGroupFrame = {
      x: groupFrame.x + dx,
      y: groupFrame.y + dy,
    };

    if (snapGuides?.applySnapToGroup) {
      nextGroupFrame = snapGuides.applySnapToGroup(nextGroupFrame, groupFrame);
    }

    const dxFinal = nextGroupFrame.x - groupFrame.x;
    const dyFinal = nextGroupFrame.y - groupFrame.y;

    selectedIds.forEach((id) => {
      const base = originalFrames[id];
      if (!base) return;
      store.getState().updateSlotFrame(id, {
        x: base.x + dxFinal,
        y: base.y + dyFinal,
      });
    });
  };

  const onWindowPointerUp = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    snapGuides?.clearGuides?.();
    useHoverStore.getState().unsuppress();
    useDragStateStore.getState().setDragging(false);
    captureAfter({ label: "Move Group", category: "transform" });
    window.removeEventListener("pointermove", onWindowPointerMove);
    window.removeEventListener("pointerup", onWindowPointerUp);
  };

  const onPointerMove = (event, snapGuides) => {
    // handled via closure
  };

  const onPointerUp = () => {
    // handled by window listener
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    isDragging,
  };
}
