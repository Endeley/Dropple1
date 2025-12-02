"use client";

import { useEffect, useState } from "react";
import { hitTestLayer } from "@/canvas/hover/hitTestLayer";

export default function useMeasureTool(canvasRef, layers) {
  const [measure, setMeasure] = useState(null);

  useEffect(() => {
    function handleMeasure({ detail }) {
      if (!canvasRef?.current) return;
      const event = detail?.e;
      if (!event || !event.shiftKey) {
        setMeasure(null);
        return;
      }

      const rect = canvasRef.current.getBoundingClientRect();
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;
      const target = hitTestLayer(px, py, layers);

      if (!target) {
        setMeasure(null);
        return;
      }

      const distances = layers
        .filter((layer) => layer.id !== target.id)
        .map((layer) => ({
          id: layer.id,
          horizontal: layer.x - target.x,
          vertical: layer.y - target.y,
        }));

      setMeasure({ target, distances });
    }

    window.addEventListener("canvas:measureMove", handleMeasure);
    return () => window.removeEventListener("canvas:measureMove", handleMeasure);
  }, [canvasRef, layers]);

  return measure;
}
