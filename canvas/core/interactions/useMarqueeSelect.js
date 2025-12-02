"use client";

import { useRef, useState } from "react";
import { useSlotSelectionStore } from "@/stores/useSlotSelectionStore";

export function useMarqueeSelect(canvasRef, definitionRef, canvasScale = 1) {
  const selection = useSlotSelectionStore();
  const [rect, setRect] = useState(null);

  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
  });

  const isActive = () => dragRef.current.active;

  const onPointerDown = (event) => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const bounds = canvasEl.getBoundingClientRect();

    const x = (event.clientX - bounds.left) / canvasScale;
    const y = (event.clientY - bounds.top) / canvasScale;

    dragRef.current = {
      active: true,
      startX: x,
      startY: y,
    };

    setRect({ x, y, width: 0, height: 0 });

    window.addEventListener("pointermove", onPointerMoveInternal);
    window.addEventListener("pointerup", onPointerUpInternal);
  };

  const onPointerMoveInternal = (event) => {
    if (!dragRef.current.active) return;
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const bounds = canvasEl.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / canvasScale;
    const y = (event.clientY - bounds.top) / canvasScale;

    const { startX, startY } = dragRef.current;

    const left = Math.min(startX, x);
    const top = Math.min(startY, y);
    const width = Math.abs(x - startX);
    const height = Math.abs(y - startY);

    setRect({ x: left, y: top, width, height });
  };

  const onPointerUpInternal = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;

    if (rect && rect.width > 4 && rect.height > 4) {
      applySelection(rect);
    }

    setRect(null);

    window.removeEventListener("pointermove", onPointerMoveInternal);
    window.removeEventListener("pointerup", onPointerUpInternal);
  };

  const applySelection = (selectionRect) => {
    const def = definitionRef.current;
    if (!def || !def.slots) return;

    const selected = def.slots.filter((slot) => {
      const f = slot.frame;
      if (!f) return false;
      return (
        f.x >= selectionRect.x &&
        f.y >= selectionRect.y &&
        f.x + f.width <= selectionRect.x + selectionRect.width &&
        f.y + f.height <= selectionRect.y + selectionRect.height
      );
    });

    if (selected.length) {
      selection.selectMultiple(selected.map((s) => s.id));
    }
  };

  const onPointerMove = () => {};
  const onPointerUp = () => {};

  return {
    rect,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    isActive,
  };
}
