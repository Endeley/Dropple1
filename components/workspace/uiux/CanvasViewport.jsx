"use client";

import { useEffect, useRef } from "react";
import { useCanvasStore } from "@/stores/canvasStore";
import { useNodesStore } from "@/stores/nodesStore";
import { useSelectionStore } from "@/stores/selectionStore";
import { useSmartGuidesStore } from "@/stores/smartGuidesStore";
import { useToolsStore } from "@/stores/toolsStore";
import { useFrameToolStore } from "@/stores/frameToolStore";
import CanvasNodeItem from "./CanvasNodeItem";
import MarqueeOverlay from "./MarqueeOverlay";
import FrameGhost from "./FrameGhost";

export default function CanvasViewport() {
  const containerRef = useRef(null);
  const spacePressed = useRef(false);

  const zoom = useCanvasStore((s) => s.zoom);
  const offset = useCanvasStore((s) => s.offset);
  const setZoom = useCanvasStore((s) => s.setZoom);
  const panStart = useCanvasStore((s) => s.panStart);
  const panMove = useCanvasStore((s) => s.panMove);
  const panEnd = useCanvasStore((s) => s.panEnd);
  const nodes = useNodesStore((s) => s.nodes);
  const isDraggingNode = useSelectionStore((s) => s.isDragging);
  const isResizing = useSelectionStore((s) => !!s.resizeHandle);
  const activeTool = useToolsStore((s) => s.activeTool);
  const isMarquee = useSelectionStore((s) => s.isMarquee);
  const marqueeStart = useSelectionStore((s) => s.marqueeStart);
  const marqueeEnd = useSelectionStore((s) => s.marqueeEnd);
  const startMarquee = useSelectionStore((s) => s.startMarquee);
  const updateMarquee = useSelectionStore((s) => s.updateMarquee);
  const endMarquee = useSelectionStore((s) => s.endMarquee);
  const selectMultiple = useSelectionStore((s) => s.selectMultiple);
  const guides = useSmartGuidesStore((s) => s.guides);
  const isCreating = useFrameToolStore((s) => s.isCreating);
  const startCreate = useFrameToolStore((s) => s.startCreate);
  const updateCreate = useFrameToolStore((s) => s.updateCreate);
  const endCreate = useFrameToolStore((s) => s.endCreate);
  const startPoint = useFrameToolStore((s) => s.startPoint);
  const currentPoint = useFrameToolStore((s) => s.currentPoint);

  const onWheel = (e) => {
    e.preventDefault();

    const rect = containerRef.current.getBoundingClientRect();
    const mouse = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = zoom + delta * zoom;

    setZoom(newZoom, mouse);
  };

  const onMarqueeMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const start = useSelectionStore.getState().marqueeStart;
    if (!rect || !start) return;

    const mouseX = (e.clientX - rect.left) / zoom - offset.x;
    const mouseY = (e.clientY - rect.top) / zoom - offset.y;

    updateMarquee(mouseX, mouseY);

    const x1 = Math.min(start.x, mouseX);
    const x2 = Math.max(start.x, mouseX);
    const y1 = Math.min(start.y, mouseY);
    const y2 = Math.max(start.y, mouseY);

    const currentNodes = useNodesStore.getState().nodes;
    const inside = Object.values(currentNodes).filter((node) => {
      return (
        node.x >= x1 &&
        node.y >= y1 &&
        node.x + node.width <= x2 &&
        node.y + node.height <= y2
      );
    });
    selectMultiple(inside.map((n) => n.id));
  };

  const onMarqueeUp = () => {
    endMarquee();
    window.removeEventListener("mousemove", onMarqueeMove);
    window.removeEventListener("mouseup", onMarqueeUp);
  };

  const onFrameCreateMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const worldX = (e.clientX - rect.left) / zoom - offset.x;
    const worldY = (e.clientY - rect.top) / zoom - offset.y;
    updateCreate(worldX, worldY);
  };

  const onFrameCreateUp = () => {
    const { startPoint: sp, currentPoint: cp } = useFrameToolStore.getState();
    if (sp && cp) {
      const x = Math.min(sp.x, cp.x);
      const y = Math.min(sp.y, cp.y);
      const width = Math.abs(cp.x - sp.x);
      const height = Math.abs(cp.y - sp.y);

      if (width > 5 && height > 5) {
        const id = `frame-${Date.now()}`;
        useNodesStore.getState().addNode({
          id,
          type: "frame",
          name: `Frame ${id.slice(-4)}`,
          x,
          y,
          width,
          height,
          fills: [{ type: "solid", color: "#0F172A" }],
          strokes: [],
          radius: 0,
        });
        useSelectionStore.getState().select(id);
      }
    }

    endCreate();
    window.removeEventListener("mousemove", onFrameCreateMove);
    window.removeEventListener("mouseup", onFrameCreateUp);
  };

  const onMouseDown = (e) => {
    if (isDraggingNode || isResizing) return;

    if (activeTool === "frame") {
      if (e.target === containerRef.current && e.button === 0) {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const worldX = (e.clientX - rect.left) / zoom - offset.x;
        const worldY = (e.clientY - rect.top) / zoom - offset.y;
        startCreate(worldX, worldY);
        window.addEventListener("mousemove", onFrameCreateMove);
        window.addEventListener("mouseup", onFrameCreateUp);
      }
      return;
    }

    if (e.button === 1 || spacePressed.current || e.metaKey || e.ctrlKey) {
      panStart(e.clientX, e.clientY);
      return;
    }

    if (e.button === 0) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / zoom - offset.x;
      const y = (e.clientY - rect.top) / zoom - offset.y;
      startMarquee(x, y);
      window.addEventListener("mousemove", onMarqueeMove);
      window.addEventListener("mouseup", onMarqueeUp);
    }
  };

  const onMouseMove = (e) => {
    panMove(e.clientX, e.clientY);
  };

  const onMouseUp = () => {
    panEnd();
  };

  useEffect(() => {
    const el = containerRef.current;

    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        spacePressed.current = true;
        event.preventDefault();
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === "Space") {
        spacePressed.current = false;
        panEnd();
        event.preventDefault();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  const gridSize = 20 * zoom;
  const gridStyle = {
    backgroundImage: `
      linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)
    `,
    backgroundSize: `${gridSize}px ${gridSize}px`,
    transform: `translate(${offset.x * zoom}px, ${offset.y * zoom}px)`,
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-slate-950 cursor-default"
      onMouseDown={onMouseDown}
    >
      <div className="absolute inset-0" style={gridStyle} />

      {Object.values(nodes).map((node) => (
        <CanvasNodeItem key={node.id} node={node} zoom={zoom} offset={offset} />
      ))}

      {isCreating && startPoint && currentPoint && (
        <FrameGhost start={startPoint} end={currentPoint} zoom={zoom} offset={offset} />
      )}

      {guides.map((g, i) => (
        <div
          key={`${g.type}-${i}`}
          className="absolute bg-violet-400/80"
          style={{
            left: g.type === "vertical" ? (g.x + offset.x) * zoom : g.x !== undefined ? g.x : undefined,
            top: g.type === "horizontal" ? (g.y + offset.y) * zoom : g.y !== undefined ? g.y : undefined,
            width: g.type === "horizontal" ? (g.length || 1) * zoom : 1,
            height: g.type === "vertical" ? (g.length || 1) * zoom : 1,
            pointerEvents: "none",
          }}
        />
      ))}

      {isMarquee && marqueeStart && marqueeEnd && (
        <MarqueeOverlay start={marqueeStart} end={marqueeEnd} zoom={zoom} offset={offset} />
      )}
    </div>
  );
}
