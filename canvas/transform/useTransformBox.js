import { useEffect, useState, useCallback } from "react";
import { useLayersStore } from "@/stores/useLayersStore";
import { HANDLE_DEFS } from "./handleDefs";
import { getBoundingBox, applyResize, applyRotation } from "./transformMath";
import useCanvasSnap from "../snap/useCanvasSnap";

export default function useTransformBox(canvasRef) {
  const { layers, activeLayerId, updateLayer } = useLayersStore();
  const activeLayer = layers.find((l) => l.id === activeLayerId);
  const [box, setBox] = useState(null);
  const [state, setState] = useState(null);
  const [guides, setGuides] = useState(null);
  const applySnap = useCanvasSnap(canvasRef, layers);

  useEffect(() => {
    if (!activeLayer) {
      setBox(null);
      setGuides(null);
      return;
    }
    setBox(getBoundingBox(activeLayer));
  }, [activeLayer]);

  const beginHandle = useCallback(
    (e, handleId) => {
      if (!box || !activeLayer || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      setState({
        mode: HANDLE_DEFS[handleId].type,
        handle: HANDLE_DEFS[handleId],
        startX: e.clientX - rect.left,
        startY: e.clientY - rect.top,
        origin: { ...box },
      });
    },
    [box, activeLayer, canvasRef]
  );

  useEffect(() => {
    function onPointerDown({ detail }) {
      if (!box || !activeLayer || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const px = detail.e.clientX - rect.left;
      const py = detail.e.clientY - rect.top;

      if (px >= box.x && px <= box.x + box.width && py >= box.y && py <= box.y + box.height) {
        window.__dropple_isTransforming = true;
        setState({
          mode: "drag",
          startX: px,
          startY: py,
          origin: { ...box },
        });
      }
    }

    function onPointerMove({ detail }) {
      if (!state || !activeLayer || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const px = detail.e.clientX - rect.left;
      const py = detail.e.clientY - rect.top;
      const dx = px - state.startX;
      const dy = py - state.startY;

      let nextState = null;
      if (state.mode === "drag") {
        nextState = {
          ...state.origin,
          x: state.origin.x + dx,
          y: state.origin.y + dy,
        };
      }

      if (state.mode === "resize") {
        nextState = applyResize(state.origin, state.handle, dx, dy);
      }

      if (state.mode === "rotate") {
        const cx = state.origin.x + state.origin.width / 2;
        const cy = state.origin.y + state.origin.height / 2;
        const angle = applyRotation(state.origin, cx, cy, px, py);
        nextState = { ...state.origin, rotation: angle };
      }

      if (!nextState) return;

      const { snapped, guides } = applySnap(state.mode, nextState, activeLayer);
      setGuides(guides);
      updateLayer(activeLayer.id, snapped);
    }

    function onPointerUp() {
      setState(null);
      setGuides(null);
      window.__dropple_isTransforming = false;
    }

    window.addEventListener("canvas:pointerDown", onPointerDown);
    window.addEventListener("canvas:pointerMove", onPointerMove);
    window.addEventListener("canvas:pointerUp", onPointerUp);

    return () => {
      window.removeEventListener("canvas:pointerDown", onPointerDown);
      window.removeEventListener("canvas:pointerMove", onPointerMove);
      window.removeEventListener("canvas:pointerUp", onPointerUp);
    };
  }, [state, activeLayer, canvasRef, box, updateLayer, applySnap]);

  return { box, onHandleDown: beginHandle, guides };
}
