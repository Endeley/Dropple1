"use client";

import { useCanvasZoomState } from "../zoom/zoomState";
import { useCanvasPanState } from "../zoom/panState";

export default function CanvasViewport({ children }) {
  const zoom = useCanvasZoomState((state) => state.zoom);
  const { x, y } = useCanvasPanState();

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#111]">
      <div
        id="canvas-viewport"
        className="absolute top-0 left-0"
        style={{
          transform: `translate(${x}px, ${y}px) scale(${zoom})`,
          transformOrigin: "0 0",
        }}
      >
        {children}
      </div>
    </div>
  );
}
