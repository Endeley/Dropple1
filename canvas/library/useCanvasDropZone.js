"use client";

import { useEffect, useRef } from "react";
import { createComponentInstance } from "@/canvas/components/createComponentInstance";
import { useCanvasZoomState } from "@/canvas/zoom/zoomState";
import { useCanvasPanState } from "@/canvas/zoom/panState";

export function useCanvasDropZone() {
  const dragMasterId = useRef(null);
  const zoom = useCanvasZoomState((state) => state.zoom);
  const { x, y } = useCanvasPanState();

  function startDragging(event, masterId) {
    dragMasterId.current = masterId;
    event.dataTransfer.effectAllowed = "copy";
  }

  useEffect(() => {
    function onDrop(e) {
      if (!dragMasterId.current) return;
      e.preventDefault();
      const viewport = document.getElementById("canvas-viewport");
      if (!viewport) return;
      const rect = viewport.getBoundingClientRect();
      const canvasX = (e.clientX - rect.left - x) / zoom;
      const canvasY = (e.clientY - rect.top - y) / zoom;
      createComponentInstance(dragMasterId.current, { x: canvasX, y: canvasY });
      dragMasterId.current = null;
    }

    function onDragOver(e) {
      if (!dragMasterId.current) return;
      e.preventDefault();
    }

    window.addEventListener("drop", onDrop);
    window.addEventListener("dragover", onDragOver);
    return () => {
      window.removeEventListener("drop", onDrop);
      window.removeEventListener("dragover", onDragOver);
    };
  }, [zoom, x, y]);

  return { startDragging };
}
