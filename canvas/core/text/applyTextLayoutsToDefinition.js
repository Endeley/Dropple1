"use client";

import { applyTextLayoutToSlot } from "./applyTextLayoutToSlot";

export function applyTextLayoutsToDefinition(definition) {
  if (!definition) return definition;
  return {
    ...definition,
    slots: (definition.slots || []).map((slot) =>
      applyTextLayoutToSlot({
        ...slot,
        frame: { ...(slot.frame || {}) },
        content: { ...(slot.content || {}) },
      })
    ),
  };
}
