"use client";

import { useEffect, useRef } from "react";
import { renderLayerTree } from "./renderLayerTree";
import { useLayerStore } from "../core/layerStore";
import { useCanvasZoom } from "../zoom/useCanvasZoom";
import { useCanvasPanState } from "../zoom/panState";

export default function RendererRoot({ canvasRef: externalRef }) {
  const internalRef = useRef(null);
  const canvasRef = externalRef || internalRef;
  const layers = useLayerStore((state) => state.layers);
  const rootIds = useLayerStore((state) => state.rootIds);
  const zoom = useCanvasZoom();
  const pan = useCanvasPanState();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);
    renderLayerTree(ctx, layers, rootIds);
    ctx.restore();
  }, [layers, rootIds, zoom, pan.x, pan.y]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
    />
  );
}
