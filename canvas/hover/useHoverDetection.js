"use client";

import { useEffect, useState } from "react";
import { useLayersStore } from "@/stores/useLayersStore";
import { hitTestLayer } from "./hitTestLayer";

export default function useHoverDetection(canvasRef) {
  const { layers, activeLayerId } = useLayersStore();
  const [hoverLayer, setHoverLayer] = useState(null);

  useEffect(() => {
    function handleMove({ detail }) {
      if (!canvasRef.current || window.__dropple_isTransforming) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const px = detail.e.clientX - rect.left;
      const py = detail.e.clientY - rect.top;

      const target = hitTestLayer(px, py, layers);
      if (!target || target.id === activeLayerId) {
        setHoverLayer(null);
      } else {
        setHoverLayer(target);
      }
    }

    function handleLeave() {
      setHoverLayer(null);
    }

    window.addEventListener("canvas:pointerMove", handleMove);
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("canvas:pointerMove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, [layers, activeLayerId, canvasRef]);

  return hoverLayer;
}
