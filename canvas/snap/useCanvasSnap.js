"use client";

import { useCallback } from "react";
import { useSnapState } from "./snapState";
import { findSnapTargets } from "./findSnapTargets";
import { snapValue, getMidpoint } from "./snapMath";
import { snapRotation } from "./rotationSnap";
import { useGridState } from "@/canvas/grid/gridState";

export default function useCanvasSnap(canvasRef, layers) {
  const enabled = useSnapState((state) => state.enabled);
  const threshold = useSnapState((state) => state.threshold);
  const grid = useGridState((state) => state);

  return useCallback(
    (mode, incomingState, activeLayer) => {
      if (!enabled || !activeLayer) {
        return { snapped: incomingState, guides: null };
      }

      const canvas = canvasRef?.current;
      if (!canvas) {
        return { snapped: incomingState, guides: null };
      }

      const targets = findSnapTargets(
        (layers || []).filter((layer) => layer.id !== activeLayer.id),
        canvas
      );

      const result = { ...incomingState };
      const guides = { vertical: [], horizontal: [] };

      const applyHorizontalSnap = (value, updater) => {
        const snapped = snapValue(value, targets.x, threshold);
        if (snapped !== value) {
          updater(snapped);
          guides.vertical.push(snapped);
        }
      };

      const applyVerticalSnap = (value, updater) => {
        const snapped = snapValue(value, targets.y, threshold);
        if (snapped !== value) {
          updater(snapped);
          guides.horizontal.push(snapped);
        }
      };

      applyHorizontalSnap(result.x, (val) => {
        result.x = val;
      });
      applyHorizontalSnap(result.x + result.width, (val) => {
        result.x = val - result.width;
      });
      applyHorizontalSnap(getMidpoint(result.x, result.width), (val) => {
        result.x = val - result.width / 2;
      });

      applyVerticalSnap(result.y, (val) => {
        result.y = val;
      });
      applyVerticalSnap(result.y + result.height, (val) => {
        result.y = val - result.height;
      });
      applyVerticalSnap(getMidpoint(result.y, result.height), (val) => {
        result.y = val - result.height / 2;
      });

      if (grid?.snapToGrid && grid.size > 0) {
        const step = grid.size;
        result.x = Math.round(result.x / step) * step;
        result.y = Math.round(result.y / step) * step;
      }

      if (mode === "rotate" && typeof result.rotation === "number") {
        result.rotation = snapRotation(result.rotation);
      }

      return { snapped: result, guides };
    },
    [enabled, layers, threshold, canvasRef, grid.snapToGrid, grid.size]
  );
}
