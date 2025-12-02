"use client";

import { useCanvasZoomState } from "./zoomState";

export function useCanvasZoom() {
  return useCanvasZoomState((state) => state.zoom);
}
