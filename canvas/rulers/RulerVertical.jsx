"use client";

import { useCanvasZoom } from "@/canvas/zoom/useCanvasZoom";
import { useCanvasPanState } from "@/canvas/zoom/panState";
import { useRulerState } from "./rulerState";

export default function RulerVertical({ canvasHeight }) {
  const zoom = useCanvasZoom();
  const pan = useCanvasPanState();
  const addGuide = useRulerState((state) => state.addGuide);

  if (!canvasHeight) return null;

  const stepWorld = 50;
  const visibleWorldHeight = canvasHeight / zoom;
  const startWorld = Math.floor((-pan.y / zoom) / stepWorld) * stepWorld;
  const marks = [];

  for (
    let world = startWorld;
    world <= startWorld + visibleWorldHeight + stepWorld;
    world += stepWorld
  ) {
    const screen = world * zoom + pan.y;
    marks.push({ world, screen });
  }

  function handlePointerDown(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const screenY = e.clientY - rect.top;
    const worldY = (screenY - pan.y) / zoom;
    addGuide({ id: crypto.randomUUID(), y: worldY });
  }

  return (
    <div className="absolute top-6 left-0 bottom-0 w-6 bg-[#0B0B10] text-white/70 text-[10px] select-none z-20">
      <div className="relative w-full h-full" onPointerDown={handlePointerDown}>
        {marks.map(({ world, screen }) => (
          <div
            key={`ry-${world}`}
            className="absolute right-0 border-t border-white/10"
            style={{ top: screen }}
          >
            <div className="absolute right-full translate-x-1/2">
              {Math.round(world)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
