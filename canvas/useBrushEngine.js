import { useEffect } from "react";

export default function useBrushEngine(canvasRef) {
  useEffect(() => {
    const handlePaint = (event) => {
      if (!canvasRef.current) return;
      const { tool } = event.detail;
      if (!tool?.includes("brush") && !tool?.includes("inpaint")) return;
      console.debug("Brush stroke", { tool, x: event.detail.e?.clientX, y: event.detail.e?.clientY });
    };
    window.addEventListener("canvas:pointerMove", handlePaint);
    return () => window.removeEventListener("canvas:pointerMove", handlePaint);
  }, [canvasRef]);
}
