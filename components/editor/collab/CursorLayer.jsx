"use client";

import { useEffect, useRef } from "react";

export default function CursorLayer({ cursors = [] }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cursors.forEach((c) => drawCursor(ctx, c));
    };
    draw();
  }, [cursors]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" width={2000} height={2000} />;
}

function drawCursor(ctx, cursor) {
  const { x = 0, y = 0, color = "#6366f1", name = "" } = cursor || {};
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "12px Inter";
  ctx.fillText(name, x + 10, y - 8);
}
