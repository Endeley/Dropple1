"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Copy, Trash2, ArrowUp, RefreshCw } from "lucide-react";
import { useImageWorkspaceStore } from "@/lib/state/workspaces/image/useImageWorkspaceStore";

export default function QuickActionsOverlay() {
  const selected = useImageWorkspaceStore((s) => s.selectedObject);
  const canvas = useImageWorkspaceStore((s) => s.canvas);
  const container = useImageWorkspaceStore((s) => s.canvasContainer);
  const duplicate = useImageWorkspaceStore((s) => s.duplicateSelected);
  const deleteSel = useImageWorkspaceStore((s) => s.deleteSelected);
  const bringForward = useImageWorkspaceStore((s) => s.bringForwardSelected);
  const addImageFromFile = useImageWorkspaceStore((s) => s.addImageFromFile);
  const [box, setBox] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.style.display = "none";
      const handler = (e) => {
        const file = e.target?.files?.[0];
        if (file) addImageFromFile(file);
        input.value = "";
      };
      input.addEventListener("change", handler);
      document.body.appendChild(input);
      fileInputRef.current = input;
      return () => {
        input.removeEventListener("change", handler);
        document.body.removeChild(input);
      };
    }
  }, [addImageFromFile]);

  useEffect(() => {
    if (!selected || !canvas || !container) {
      setBox(null);
      return;
    }
    const compute = () => {
      const rect = selected.getBoundingRect(true, true);
      const vpt = canvas.viewportTransform || [1, 0, 0, 1, 0, 0];
      const left = rect.left * vpt[0] + vpt[4];
      const top = rect.top * vpt[3] + vpt[5];
      const width = rect.width * vpt[0];
      const height = rect.height * vpt[3];
      setBox({
        left,
        top,
        width,
        height,
      });
    };
    compute();
    const events = ["object:moving", "object:scaling", "object:rotating", "after:render"];
    events.forEach((ev) => canvas.on(ev, compute));
    return () => {
      events.forEach((ev) => canvas.off(ev, compute));
    };
  }, [selected, canvas, container]);

  const style = useMemo(() => {
    if (!box) return { opacity: 0, pointerEvents: "none" };
    return {
      position: "absolute",
      top: Math.max(8, box.top + box.height + 8),
      left: box.left + box.width / 2,
      transform: "translateX(-50%)",
      display: "flex",
      gap: "8px",
      alignItems: "center",
      padding: "6px 8px",
      borderRadius: "999px",
      background: "rgba(17, 24, 39, 0.86)",
      color: "white",
      boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      pointerEvents: "auto",
      zIndex: 5,
    };
  }, [box]);

  if (!selected || !box) return null;

  const actions = [
    { id: "dup", label: "Duplicate", icon: Copy, onClick: duplicate },
    { id: "del", label: "Delete", icon: Trash2, onClick: deleteSel },
    { id: "front", label: "Layer up", icon: ArrowUp, onClick: bringForward },
    { id: "replace", label: "Replace", icon: RefreshCw, onClick: () => fileInputRef.current?.click() },
  ];

  return (
    <div style={style}>
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.id}
            type="button"
            onClick={action.onClick}
            className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/20"
          >
            <Icon size={14} />
            <span>{action.label}</span>
          </button>
        );
      })}
    </div>
  );
}
