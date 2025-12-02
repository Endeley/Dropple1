"use client";

import { useGridState } from "./gridState";
import { useCanvasZoom } from "@/canvas/zoom/useCanvasZoom";

export default function GridOverlay({ width, height }) {
  const { enabled, size, color, type } = useGridState();
  const zoom = useCanvasZoom();

  if (!enabled || !width || !height) return null;

  const step = Math.max(size * zoom, 4); // prevent sub-pixel flicker
  const linesX = [];
  const linesY = [];

  for (let x = 0; x <= width; x += step) linesX.push(x);
  for (let y = 0; y <= height; y += step) linesY.push(y);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {type === "line" && (
        <>
          {linesX.map((x) => (
            <div
              key={`grid-x-${x}`}
              className="absolute top-0 bottom-0"
              style={{ left: x, width: 1, background: color }}
            />
          ))}
          {linesY.map((y) => (
            <div
              key={`grid-y-${y}`}
              className="absolute left-0 right-0"
              style={{ top: y, height: 1, background: color }}
            />
          ))}
        </>
      )}

      {type === "dot" && (
        <>
          {linesX.map((x) =>
            linesY.map((y) => (
              <div
                key={`grid-dot-${x}-${y}`}
                className="absolute rounded-full"
                style={{
                  left: x - 1,
                  top: y - 1,
                  width: 2,
                  height: 2,
                  background: color,
                }}
              />
            ))
          )}
        </>
      )}
    </div>
  );
}
