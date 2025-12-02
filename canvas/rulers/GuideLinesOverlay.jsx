"use client";

import { useRulerState } from "./rulerState";
import { useCanvasZoom } from "@/canvas/zoom/useCanvasZoom";
import { useCanvasPanState } from "@/canvas/zoom/panState";

export default function GuideLinesOverlay() {
  const { guides, showGuides } = useRulerState();
  const zoom = useCanvasZoom();
  const pan = useCanvasPanState();

  if (!showGuides || guides.length === 0) return null;

  return (
    <>
      {guides.map((guide) => {
        if (guide.x !== undefined) {
          const screenX = guide.x * zoom + pan.x;
          return (
            <div
              key={guide.id}
              className="absolute top-0 bottom-0 w-px bg-sky-400/60"
              style={{ left: screenX }}
            />
          );
        }

        const screenY = guide.y * zoom + pan.y;
        return (
          <div
            key={guide.id}
            className="absolute left-0 right-0 h-px bg-sky-400/60"
            style={{ top: screenY }}
          />
        );
      })}
    </>
  );
}
