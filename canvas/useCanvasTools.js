import { useEffect } from "react";
import { useWorkspaceStore } from "@/lib/state/workspace/useWorkspaceStore";
import toolRegistry from "./toolRegistry";

export default function useCanvasTools(canvasRef) {
  const { activeTool, mode } = useWorkspaceStore();

  useEffect(() => {
    const handleDown = (event) => {
      const tool = toolRegistry(mode, event.detail.tool || activeTool);
      tool?.onPointerDown?.(event.detail.e, canvasRef.current);
    };
    const handleMove = (event) => {
      const tool = toolRegistry(mode, event.detail.tool || activeTool);
      tool?.onPointerMove?.(event.detail.e, canvasRef.current);
    };
    const handleUp = (event) => {
      const tool = toolRegistry(mode, event.detail.tool || activeTool);
      tool?.onPointerUp?.(event.detail.e, canvasRef.current);
    };

    window.addEventListener("canvas:pointerDown", handleDown);
    window.addEventListener("canvas:pointerMove", handleMove);
    window.addEventListener("canvas:pointerUp", handleUp);

    return () => {
      window.removeEventListener("canvas:pointerDown", handleDown);
      window.removeEventListener("canvas:pointerMove", handleMove);
      window.removeEventListener("canvas:pointerUp", handleUp);
    };
  }, [activeTool, mode, canvasRef]);
}
