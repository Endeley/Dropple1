import { useEffect } from "react";
import { useWorkspaceStore } from "@/lib/state/workspace/useWorkspaceStore";

export default function useCanvasEvents(canvasRef) {
  const { activeTool } = useWorkspaceStore();

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const pointerDown = (e) => {
      window.dispatchEvent(
        new CustomEvent("canvas:pointerDown", {
          detail: { e, tool: activeTool },
        })
      );
    };

    const pointerMove = (e) => {
      window.dispatchEvent(
        new CustomEvent("canvas:pointerMove", {
          detail: { e, tool: activeTool },
        })
      );
    };

    const pointerUp = (e) => {
      window.dispatchEvent(
        new CustomEvent("canvas:pointerUp", {
          detail: { e, tool: activeTool },
        })
      );
    };

    el.addEventListener("pointerdown", pointerDown);
    el.addEventListener("pointermove", pointerMove);
    el.addEventListener("pointerup", pointerUp);

    return () => {
      el.removeEventListener("pointerdown", pointerDown);
      el.removeEventListener("pointermove", pointerMove);
      el.removeEventListener("pointerup", pointerUp);
    };
  }, [canvasRef, activeTool]);
}
