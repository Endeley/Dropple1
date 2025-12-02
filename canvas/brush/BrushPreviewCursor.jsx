"use client";

import { useBrushSettings } from "./brushSettingsStore";

export default function BrushPreviewCursor({ x, y }) {
  const size = useBrushSettings((s) => s.size);
  if (x == null || y == null) return null;
  return (
    <div
      className="pointer-events-none absolute border border-white/60 rounded-full"
      style={{
        width: size * 2,
        height: size * 2,
        left: x - size,
        top: y - size,
      }}
    />
  );
}
