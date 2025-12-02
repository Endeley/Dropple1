"use client";

import { HANDLE_DEFS } from "@/canvas/core/resize/handleDefs";

export function resolveCursor({ hover = {}, dragState = {}, resizeState = {} }) {
  if (resizeState.resizing && resizeState.handle) {
    return resizeState.handle.cursor || "default";
  }

  if (hover.hoveredHandle) {
    const handleDef =
      hover.hoveredHandle.def || HANDLE_DEFS[hover.hoveredHandle.handle];
    if (handleDef?.cursor) return handleDef.cursor;
  }

  if (dragState.dragging) {
    return "move";
  }

  if (
    hover.hoveredSlotType &&
    typeof hover.hoveredSlotType === "string" &&
    hover.hoveredSlotType.startsWith("text")
  ) {
    return "text";
  }

  if (hover.hoveredSlotId) {
    return "pointer";
  }

  return "default";
}
