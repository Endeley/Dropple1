"use client";

import { useEffect } from "react";
import { useHoverStore } from "@/stores/useHoverStore";
import { useCursorStore } from "@/stores/useCursorStore";
import { useDragStateStore } from "@/stores/useDragStateStore";
import { useResizeStateStore } from "@/stores/useResizeStateStore";
import { useInlineTextEditor } from "@/stores/useInlineTextEditor";
import { resolveCursor } from "./resolveCursor";

export function useCursorController() {
  const hover = useHoverStore((state) => ({
    hoveredHandle: state.hoveredHandle,
    hoveredSlotId: state.hoveredSlotId,
    hoveredSlotType: state.hoveredSlotType,
  }));
  const dragState = useDragStateStore((state) => ({
    dragging: state.dragging,
    source: state.source,
  }));
  const resizeState = useResizeStateStore((state) => ({
    resizing: state.resizing,
    handle: state.handle,
  }));
  const textEditingActive = useInlineTextEditor((state) => state.active);
  const cursor = useCursorStore((state) => state.cursor);
  const setCursor = useCursorStore((state) => state.setCursor);

  useEffect(() => {
    if (textEditingActive) {
      setCursor("text");
      return;
    }

    const resolved = resolveCursor({
      hover,
      dragState,
      resizeState,
    });
    setCursor(resolved);
  }, [dragState, hover, resizeState, setCursor, textEditingActive]);

  useEffect(() => {
    if (typeof document === "undefined") return () => {};
    const previous = document.body.style.cursor;
    document.body.style.cursor = cursor || "default";
    return () => {
      document.body.style.cursor = previous || "default";
    };
  }, [cursor]);
}
