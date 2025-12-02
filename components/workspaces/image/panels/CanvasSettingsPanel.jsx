"use client";

import { useImageWorkspaceStore } from "@/lib/state/workspaces/image/useImageWorkspaceStore";

export default function CanvasSettingsPanel() {
  const zoom = useImageWorkspaceStore((s) => s.zoom);
  const showGrid = useImageWorkspaceStore((s) => s.showGrid);
  const gridSize = useImageWorkspaceStore((s) => s.gridSize);
  const toggleGrid = useImageWorkspaceStore((s) => s.toggleGrid);
  const setGridSize = useImageWorkspaceStore((s) => s.setGridSize);
  const snapToGrid = useImageWorkspaceStore((s) => s.snapToGrid);
  const toggleSnapToGrid = useImageWorkspaceStore((s) => s.toggleSnapToGrid);
  const showSafeGuides = useImageWorkspaceStore((s) => s.showSafeGuides);
  const toggleSafeGuides = useImageWorkspaceStore((s) => s.toggleSafeGuides);
  const bleedPercent = useImageWorkspaceStore((s) => s.bleedPercent);
  const setBleedPercent = useImageWorkspaceStore((s) => s.setBleedPercent);

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900">Canvas</h3>
        <span className="text-[11px] text-neutral-600">{Math.round(zoom * 100)}%</span>
      </div>
      <div className="space-y-3 text-sm text-neutral-700">
        <div className="flex items-center justify-between">
          <span>Size</span>
          <span className="text-neutral-500">Auto-fit</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Grid</span>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1 text-xs text-neutral-700">
              <input type="checkbox" checked={showGrid} onChange={toggleGrid} />
              Show
            </label>
            <input
              type="number"
              className="w-16 rounded border border-neutral-200 px-2 py-1 text-xs"
              value={gridSize}
              onChange={(e) => setGridSize(e.target.value)}
              min={4}
              step={2}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span>Snap to grid</span>
          <label className="flex items-center gap-1 text-xs text-neutral-700">
            <input type="checkbox" checked={snapToGrid} onChange={toggleSnapToGrid} />
            Enable
          </label>
        </div>
        <div className="flex items-center justify-between">
          <span>Bleed / Safe area</span>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1 text-xs text-neutral-700">
              <input type="checkbox" checked={showSafeGuides} onChange={toggleSafeGuides} />
              Show
            </label>
            <input
              type="number"
              min={0}
              max={0.2}
              step={0.01}
              className="w-16 rounded border border-neutral-200 px-2 py-1 text-xs"
              value={bleedPercent}
              onChange={(e) => setBleedPercent(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span>DPI</span>
          <span className="text-neutral-500">72</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Transform</span>
          <span className="text-neutral-500">Rotate / Flip coming soon</span>
        </div>
      </div>
    </div>
  );
}
