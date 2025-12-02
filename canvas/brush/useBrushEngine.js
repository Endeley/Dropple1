import { useEffect, useState } from "react";
import { useWorkspaceStore } from "@/lib/state/workspace/useWorkspaceStore";
import { useBrushSettings } from "./brushSettingsStore";
import { brushRegistry } from "./brushRegistry";
import { createMaskCanvas, applyBrushToMask } from "./maskCanvas";
import { interpolatePoints } from "./brushMath";
import { strokeStore } from "./strokeStore";

export default function useBrushEngine(canvasRef) {
  const { mode, activeTool } = useWorkspaceStore();
  const settings = useBrushSettings();
  const [mask, setMask] = useState(null);
  const [lastPoint, setLastPoint] = useState(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const { width, height } = canvasRef.current;
    setMask(createMaskCanvas(width, height));
  }, [canvasRef]);

  useEffect(() => {
    function onDown({ detail }) {
      if (!mask || !canvasRef.current) return;
      const toolKey = `${mode}:${activeTool}`;
      const brush = brushRegistry[toolKey];
      if (!brush) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = detail.e.clientX - rect.left;
      const y = detail.e.clientY - rect.top;
      applyBrushToMask(mask.ctx, x, y, settings.size, settings.hardness, brush.mode);
      strokeStore.push(mask.ctx.getImageData(0, 0, mask.canvas.width, mask.canvas.height));
      setLastPoint({ x, y });
    }

    function onMove({ detail }) {
      if (!mask || !lastPoint || !canvasRef.current) return;
      const toolKey = `${mode}:${activeTool}`;
      const brush = brushRegistry[toolKey];
      if (!brush) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = detail.e.clientX - rect.left;
      const y = detail.e.clientY - rect.top;
      const points = interpolatePoints(lastPoint, { x, y }, Math.max(1, settings.size * 0.25));
      points.forEach((p) => applyBrushToMask(mask.ctx, p.x, p.y, settings.size, settings.hardness, brush.mode));
      setLastPoint({ x, y });
    }

    function onUp() {
      setLastPoint(null);
    }

    window.addEventListener("canvas:pointerDown", onDown);
    window.addEventListener("canvas:pointerMove", onMove);
    window.addEventListener("canvas:pointerUp", onUp);
    return () => {
      window.removeEventListener("canvas:pointerDown", onDown);
      window.removeEventListener("canvas:pointerMove", onMove);
      window.removeEventListener("canvas:pointerUp", onUp);
    };
  }, [mask, lastPoint, mode, activeTool, settings, canvasRef]);
}
