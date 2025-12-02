"use client";

export default function GroupFrame({ frame, scale = 1 }) {
  if (!frame) return null;

  return (
    <div
      className="absolute border border-blue-500/70 pointer-events-none"
      style={{
        left: frame.x * scale,
        top: frame.y * scale,
        width: frame.width * scale,
        height: frame.height * scale,
        zIndex: 900,
      }}
    />
  );
}
