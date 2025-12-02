"use client";

import { useEffect, useRef } from "react";

export default function PreviewSurface({ surface }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!surface || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(surface.canvas, 0, 0);
  });

  if (!surface) return null;

  return (
    <div className="relative bg-black rounded-xl overflow-hidden border border-white/10 shadow-inner">
      <canvas
        ref={canvasRef}
        width={surface.canvas.width}
        height={surface.canvas.height}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
