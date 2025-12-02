"use client";

import { emitCanvasEvent } from "./canvasEvents";
import { useWorkspaceStore } from "@/lib/state/workspace/useWorkspaceStore";

export default function PointerController({ children }) {
  const activeTool = useWorkspaceStore((state) => state.activeTool);

  function handlePointerMove(e) {
    emitCanvasEvent("canvas:pointerMove", { e, tool: activeTool });
    emitCanvasEvent("canvas:measureMove", { e, tool: activeTool });
  }

  function handlePointerDown(e) {
    emitCanvasEvent("canvas:pointerDown", { e, tool: activeTool });
  }

  function handlePointerUp(e) {
    emitCanvasEvent("canvas:pointerUp", { e, tool: activeTool });
  }

  return (
    <div
      className="relative w-full h-full"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {children}
    </div>
  );
}
