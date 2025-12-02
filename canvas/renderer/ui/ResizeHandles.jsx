"use client";

import { HANDLE_DEFS } from "@/canvas/core/resize/handleDefs";
import { useHoverStore } from "@/stores/useHoverStore";

export default function ResizeHandles({ frame, scale = 1, onPointerDown, slotId = null }) {
  const hoveredHandle = useHoverStore((state) => state.hoveredHandle);
  if (!frame) return null;

  return (
    <>
      {Object.entries(HANDLE_DEFS).map(([key, def]) => {
        const size = 10 * scale;
        const left =
          frame.x * scale + (frame.width * scale * (def.x + 1)) / 2 - size / 2;
        const top =
          frame.y * scale + (frame.height * scale * (def.y + 1)) / 2 - size / 2;

        const handlePointerDown = onPointerDown
          ? (event) => {
              event.stopPropagation();
              event.preventDefault();
              onPointerDown(event, key);
            }
          : undefined;

        const isHovered =
          hoveredHandle &&
          hoveredHandle.slotId === slotId &&
          hoveredHandle.handle === key;

        return (
          <div
            key={key}
            className={`absolute border border-violet-500 rounded shadow-sm transition-opacity duration-75 ${
              isHovered ? "bg-violet-500 opacity-100" : "bg-white opacity-100 hover:opacity-80"
            }`}
            style={{
              left,
              top,
              width: size,
              height: size,
              cursor: def.cursor,
              zIndex: 2000,
            }}
            onPointerDown={handlePointerDown}
          />
        );
      })}
    </>
  );
}
