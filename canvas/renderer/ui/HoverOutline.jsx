"use client";

import { useHoverStore } from "@/stores/useHoverStore";
import { useTemplateMasterStore } from "@/stores/useTemplateMasterStore";

export default function HoverOutline({ scale = 1 }) {
  const hoveredSlotId = useHoverStore((state) => state.hoveredSlotId);
  const definition = useTemplateMasterStore((state) => state.definition);

  if (!hoveredSlotId || !definition?.slots?.length) return null;
  const slot = definition.slots.find((s) => s.id === hoveredSlotId);
  if (!slot?.frame) return null;

  const frame = slot.frame;

  return (
    <div
      className="absolute pointer-events-none border border-violet-400/60 rounded-sm"
      style={{
        left: frame.x * scale,
        top: frame.y * scale,
        width: frame.width * scale,
        height: frame.height * scale,
        zIndex: 950,
      }}
    />
  );
}
