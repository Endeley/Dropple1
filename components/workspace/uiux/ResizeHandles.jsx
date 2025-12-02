"use client";

import { useSelectionStore } from "@/stores/selectionStore";
import { endResize, onResize } from "./onResize";

const HANDLES = [
  { id: "tl", x: 0, y: 0 },
  { id: "tm", x: 0.5, y: 0 },
  { id: "tr", x: 1, y: 0 },
  { id: "mr", x: 1, y: 0.5 },
  { id: "br", x: 1, y: 1 },
  { id: "bm", x: 0.5, y: 1 },
  { id: "bl", x: 0, y: 1 },
  { id: "ml", x: 0, y: 0.5 },
];

export default function ResizeHandles({ node, zoom }) {
  const startResize = useSelectionStore((s) => s.startResize);

  const handleMouseDown = (e, handle) => {
    e.stopPropagation();
    startResize(handle, e.clientX, e.clientY, node);

    const move = (ev) => onResize(ev, handle, node, zoom);
    const up = () => {
      endResize();
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  return (
    <div className="absolute inset-0">
      {HANDLES.map((h) => {
        const size = Math.max(6, 8 * zoom);
        return (
          <div
            key={h.id}
            onMouseDown={(e) => handleMouseDown(e, h.id)}
            className="absolute rounded-full border border-white bg-violet-400"
            style={{
              width: size,
              height: size,
              left: `calc(${h.x * 100}% - ${size / 2}px)`,
              top: `calc(${h.y * 100}% - ${size / 2}px)`,
              cursor: cursorForHandle(h.id),
            }}
          />
        );
      })}
    </div>
  );
}

function cursorForHandle(id) {
  switch (id) {
    case "tl":
    case "br":
      return "nwse-resize";
    case "tr":
    case "bl":
      return "nesw-resize";
    case "tm":
    case "bm":
      return "ns-resize";
    case "ml":
    case "mr":
      return "ew-resize";
    default:
      return "default";
  }
}
