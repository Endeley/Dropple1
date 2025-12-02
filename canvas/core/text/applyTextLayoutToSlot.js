"use client";

import { computeTextLayout } from "./computeTextLayout";

export function applyTextLayoutToSlot(slot) {
  if (!slot?.type?.startsWith("text")) {
    return slot;
  }

  const layout = computeTextLayout(slot.content || {});
  if (!layout) {
    return slot;
  }

  return {
    ...slot,
    content: {
      ...slot.content,
      _layout: layout,
    },
  };
}
