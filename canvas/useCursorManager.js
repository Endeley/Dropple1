import { useEffect } from "react";
import { useWorkspaceStore } from "@/lib/state/workspace/useWorkspaceStore";
import cursorMap from "./cursorMap";

export default function useCursorManager(canvasRef) {
  const { activeTool, mode } = useWorkspaceStore();

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    el.style.cursor = cursorMap(mode, activeTool);
  }, [canvasRef, activeTool, mode]);
}
