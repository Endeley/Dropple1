"use client";

import { useEffect, useRef, useState } from "react";
import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

export default function AIEditMaskLayer() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const maskBrushSize = useAIStudioStore((s) => s.maskBrushSize);
  const setMaskCanvas = useAIStudioStore((s) => s.setMaskCanvas);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resize();
    window.addEventListener("resize", resize);
    setMaskCanvas(canvas);

    return () => {
      window.removeEventListener("resize", resize);
      setMaskCanvas(null);
    };
  }, [setMaskCanvas]);

  const handlePointerDown = (event) => {
    event.preventDefault();
    setIsDrawing(true);
    draw(event);
  };

  const handlePointerUp = (event) => {
    event.preventDefault();
    setIsDrawing(false);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX || event.touches?.[0]?.clientX) - rect.left;
    const y = (event.clientY || event.touches?.[0]?.clientY) - rect.top;

    ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
    ctx.beginPath();
    ctx.arc(x, y, maskBrushSize, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto cursor-crosshair opacity-70"
      onMouseDown={handlePointerDown}
      onMouseUp={handlePointerUp}
      onMouseMove={draw}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchEnd={handlePointerUp}
      onTouchMove={draw}
    />
  );
}
