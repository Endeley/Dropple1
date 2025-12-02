"use client";

import { useCanvasZoom } from "@/canvas/zoom/useCanvasZoom";
import { useCanvasPanState } from "@/canvas/zoom/panState";
import { useRulerState } from "./rulerState";

export default function RulerHorizontal({ canvasWidth }) {
  const zoom = useCanvasZoom();
  const pan = useCanvasPanState();
  const addGuide = useRulerState((state) => state.addGuide);

  if (!canvasWidth) return null;

  const stepWorld = 50;
  const visibleWorldWidth = canvasWidth / zoom;
  const startWorld = Math.floor((-pan.x / zoom) / stepWorld) * stepWorld;
  const marks = [];

  for (
    let world = startWorld;
    world <= startWorld + visibleWorldWidth + stepWorld;
    world += stepWorld
  ) {
    const screen = world * zoom + pan.x;
    marks.push({ world, screen });
  }

  function handlePointerDown(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const worldX = (screenX - pan.x) / zoom;
    addGuide({ id: crypto.randomUUID(), x: worldX });
  }

  return (
    <div className="absolute top-0 left-6 right-0 h-6 bg-[#0B0B10] text-white/70 text-[10px] select-none z-20">
      <div className="relative w-full h-full" onPointerDown={handlePointerDown}>
        {marks.map(({ world, screen }) => (
          <div
            key={`rx-${world}`}
            className="absolute bottom-0 border-l border-white/10"
            style={{ left: screen }}
          >
            <div className="absolute bottom-full translate-y-1/2">
              {Math.round(world)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
