"use client";

import { useSelectionStore } from "@/stores/selectionStore";
import { useNodesStore } from "@/stores/nodesStore";
import { useSmartGuidesStore } from "@/stores/smartGuidesStore";
import { computeSnap } from "./utils/snapEngine";
import ResizeHandles from "./ResizeHandles";

export default function CanvasNodeItem({ node, zoom, offset }) {
  const selectedIds = useSelectionStore((s) => s.selectedIds);
  const isSelected = selectedIds.includes(node.id);

  const select = useSelectionStore((s) => s.select);
  const selectToggle = useSelectionStore((s) => s.selectToggle);
  const startDrag = useSelectionStore((s) => s.startDrag);
  const dragMove = useSelectionStore((s) => s.dragMove);
  const endDrag = useSelectionStore((s) => s.endDrag);

  const updateNode = useNodesStore((s) => s.updateNode);

  const handleMouseDown = (e) => {
    e.stopPropagation();
    if (e.shiftKey) {
      selectToggle(node.id);
    } else {
      select(node.id);
    }

    if (e.button !== 0 || e.shiftKey) return;

    const nodes = useNodesStore.getState().nodes;
    const currentSelection = useSelectionStore.getState().selectedIds;
    const baselines = currentSelection.map((id) => ({
      id,
      x: nodes[id]?.x ?? 0,
      y: nodes[id]?.y ?? 0,
    }));

    startDrag(e.clientX, e.clientY, baselines);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const delta = dragMove(e.clientX, e.clientY, zoom);
    if (!delta) return;

    const multi =
      useSelectionStore.getState().multiDragStart?.length
        ? useSelectionStore.getState().multiDragStart
        : [{ id: node.id, x: node.x, y: node.y }];
    const nodes = useNodesStore.getState().nodes;
    const primary = multi.find((i) => i.id === node.id) || multi[0] || { id: node.id, x: node.x, y: node.y };

    let targetX = primary.x + delta.dx;
    let targetY = primary.y + delta.dy;

    if (!e.metaKey && !e.ctrlKey) {
      const snap = computeSnap({
        movingNodeId: node.id,
        nodes,
        proposedX: targetX,
        proposedY: targetY,
      });
      targetX = snap.x;
      targetY = snap.y;
      useSmartGuidesStore.getState().setGuides(snap.guides);
    }

    multi.forEach((item) => {
      const offsetX = item.id === node.id ? targetX - primary.x : delta.dx;
      const offsetY = item.id === node.id ? targetY - primary.y : delta.dy;
      updateNode(item.id, {
        x: item.x + offsetX,
        y: item.y + offsetY,
      });
    });
  };

  const handleMouseUp = () => {
    endDrag();
    useSmartGuidesStore.getState().clearGuides();
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const x = (node.x + offset.x) * zoom;
  const y = (node.y + offset.y) * zoom;

  return (
    <div
      className="absolute"
      onMouseDown={handleMouseDown}
      style={{
        left: x,
        top: y,
        width: node.width * zoom,
        height: node.height * zoom,
        background: node.fills?.[0]?.color || "#1e293b",
        borderRadius: (node.radius || 0) * zoom,
        border: isSelected
          ? `${Math.max(1, 1 * zoom)}px solid rgba(139,92,246,0.9)`
          : `${Math.max(1, 1 * zoom)}px solid rgba(71,85,105,0.6)`,
        boxShadow: isSelected ? `0 0 ${30 * zoom}px rgba(139,92,246,0.4)` : "none",
      }}
    >
      <div className="absolute -top-5 left-0 rounded border border-slate-700 bg-slate-900/80 px-2 py-[2px] text-[11px] text-slate-200">
        {node.name}
      </div>
      {isSelected && <ResizeHandles node={node} zoom={zoom} />}
    </div>
  );
}
