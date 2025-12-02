"use client";

import { useEffect, useRef } from "react";
import { useEditorMode } from "@/canvas/editor/editorModeStore";
import { useComponentStore } from "@/canvas/components/componentStore";
import { renderMasterTree } from "./renderMasterTree";
import { useCanvasZoom } from "@/canvas/zoom/useCanvasZoom";
import { useCanvasPanState } from "@/canvas/zoom/panState";

export default function MasterModeRenderer() {
  const mode = useEditorMode((state) => state.mode);
  const masterId = useEditorMode((state) => state.masterId);
  const master = useComponentStore((state) =>
    masterId ? state.masters[masterId] : null
  );
  const canvasRef = useRef(null);
  const zoom = useCanvasZoom();
  const { x, y } = useCanvasPanState();

  useEffect(() => {
    if (mode !== "component" || !master) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(zoom, zoom);
      renderMasterTree(ctx, master.layers, master.rootLayerIds);
      ctx.restore();
    };

    draw();
  }, [mode, master, zoom, x, y]);

  if (mode !== "component" || !master) return null;

  return (
    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
  );
}
