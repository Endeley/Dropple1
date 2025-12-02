"use client";

import { useEffect, useRef, useState } from "react";
import useCanvasTools from "@/canvas/useCanvasTools";
import useCursorManager from "@/canvas/useCursorManager";
import useSelectionManager from "@/canvas/useSelectionManager";
import useTransformBox from "@/canvas/transform/useTransformBox";
import useBrushEngine from "@/canvas/useBrushEngine";
import useTimelineEvents from "@/canvas/useTimelineEvents";
import { useWorkspaceStore } from "@/lib/state/workspace/useWorkspaceStore";
import TransformOverlay from "@/canvas/transform/TransformOverlay";
import SmartGuideOverlay from "@/canvas/snap/GuideOverlay";
import useHoverDetection from "@/canvas/hover/useHoverDetection";
import HoverOverlay from "@/canvas/hover/HoverOverlay";
import PointerController from "@/canvas/events/PointerController";
import CanvasViewport from "@/canvas/viewport/CanvasViewport";
import OverlayRoot from "@/canvas/overlays/OverlayRoot";
import GridOverlay from "@/canvas/grid/GridOverlay";
import { useRulerState } from "@/canvas/rulers/rulerState";
import RulerHorizontal from "@/canvas/rulers/RulerHorizontal";
import RulerVertical from "@/canvas/rulers/RulerVertical";
import GuideLinesOverlay from "@/canvas/rulers/GuideLinesOverlay";
import MeasurementOverlay from "@/canvas/measure/MeasurementOverlay";
import useMeasureTool from "@/canvas/measure/useMeasureTool";
import { useLayersStore } from "@/stores/useLayersStore";
import RendererRoot from "@/canvas/renderer/RendererRoot";
import MasterModeRenderer from "@/canvas/renderer/MasterModeRenderer";
import Renderer2D from "@/canvas/renderer/Renderer2D";
import ComponentLibraryPanel from "@/canvas/library/ComponentLibraryPanel";
import ComponentLibraryToggle from "@/canvas/library/ComponentLibraryToggle";
import { useEditorMode } from "@/canvas/editor/editorModeStore";

export default function CanvasOrchestrator({ Overlay }) {
  const canvasRef = useRef(null);
  const { mode } = useWorkspaceStore();
  const editorMode = useEditorMode((state) => state.mode);
  const showRulers = useRulerState((state) => state.showRulers);
  const layers = useLayersStore((state) => state.layers || []);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const updateSize = () => {
      const { offsetWidth, offsetHeight } = el;
      el.width = offsetWidth;
      el.height = offsetHeight;
      setViewportSize({ width: offsetWidth, height: offsetHeight });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useCanvasTools(canvasRef);
  useCursorManager(canvasRef);
  useSelectionManager(canvasRef);
  const { box, onHandleDown, guides } = useTransformBox(canvasRef);
  const hoverLayer = useHoverDetection(canvasRef);
  const measure = useMeasureTool(canvasRef, layers);
  useTimelineEvents();

  if (["smart", "smart-edit", "ai", "ai-studio"].includes(mode)) {
    useBrushEngine(canvasRef);
  }

  const isMasterMode = editorMode === "component";

  return (
    <div className="flex w-full h-full bg-[#09090F]">
      {!isMasterMode && <ComponentLibraryPanel />}
      <div className="relative flex-1">
        <ComponentLibraryToggle />
        {showRulers && (
          <>
            <div className="absolute top-0 left-6 right-0 h-6 z-30">
              <RulerHorizontal canvasWidth={viewportSize.width} />
            </div>
          <div className="absolute left-0 top-6 bottom-0 w-6 z-30">
            <RulerVertical canvasHeight={viewportSize.height} />
          </div>
          <div className="absolute top-0 left-0 w-6 h-6 bg-[#050507] z-30 border-r border-b border-white/10" />
        </>
      )}

        <div className="absolute top-6 left-6 right-0 bottom-0">
          <PointerController>
            <CanvasViewport>
              <div className="relative w-full h-full">
                {isMasterMode ? (
                  <MasterModeRenderer />
                ) : (
                  <>
                    <Renderer2D />
                    <RendererRoot canvasRef={canvasRef} />
                  </>
                )}
                {!isMasterMode && (
                  <OverlayRoot>
                    <GridOverlay width={viewportSize.width} height={viewportSize.height} />
                    <GuideLinesOverlay />
                    <SmartGuideOverlay guides={guides} />
                    <HoverOverlay layer={hoverLayer} />
                    <MeasurementOverlay measure={measure} />
                    <TransformOverlay box={box} onHandleDown={onHandleDown} />
                    {Overlay && <Overlay />}
                  </OverlayRoot>
                )}
              </div>
            </CanvasViewport>
          </PointerController>
        </div>
      </div>
    </div>
  );
}
