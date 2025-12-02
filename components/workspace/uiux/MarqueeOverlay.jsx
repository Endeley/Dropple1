"use client";

export default function MarqueeOverlay({ start, end, zoom, offset }) {
  const x1 = (start.x + offset.x) * zoom;
  const y1 = (start.y + offset.y) * zoom;
  const x2 = (end.x + offset.x) * zoom;
  const y2 = (end.y + offset.y) * zoom;

  const left = Math.min(x1, x2);
  const top = Math.min(y1, y2);
  const width = Math.abs(x2 - x1);
  const height = Math.abs(y2 - y1);

  return (
    <div
      className="absolute border border-violet-400/70 bg-violet-400/10"
      style={{
        left,
        top,
        width,
        height,
        pointerEvents: "none",
      }}
    />
  );
}
