"use client";

import { useImageWorkspaceStore } from "@/lib/state/workspaces/image/useImageWorkspaceStore";

export default function TransformPanel() {
  const transform = useImageWorkspaceStore((s) => s.transform);
  const setTransform = useImageWorkspaceStore((s) => s.setTransform);

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900">Transform</h3>
        <button
          type="button"
          onClick={() => {
            setTransform("rotate", 0);
            setTransform("scale", 1);
            setTransform("flipX", false);
            setTransform("flipY", false);
          }}
          className="text-[11px] text-neutral-600 hover:text-neutral-900"
        >
          Reset
        </button>
      </div>
      <div className="space-y-3 text-sm text-neutral-700">
        <label className="flex items-center justify-between">
          <span>Rotate</span>
          <input
            type="number"
            value={transform.rotate}
            onChange={(e) => setTransform("rotate", Number(e.target.value))}
            className="w-20 rounded border border-neutral-200 bg-white px-2 py-1 text-xs text-neutral-900"
          />
        </label>
        <label className="flex items-center justify-between">
          <span>Scale</span>
          <input
            type="number"
            step="0.01"
            value={transform.scale}
            onChange={(e) => setTransform("scale", Number(e.target.value))}
            className="w-20 rounded border border-neutral-200 bg-white px-2 py-1 text-xs text-neutral-900"
          />
        </label>
        <div className="flex items-center justify-between">
          <span>Flip</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTransform("flipX", !transform.flipX)}
              className={`rounded px-3 py-1 text-xs font-semibold ${
                transform.flipX ? "bg-violet-600 text-white" : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
              }`}
            >
              Flip X
            </button>
            <button
              type="button"
              onClick={() => setTransform("flipY", !transform.flipY)}
              className={`rounded px-3 py-1 text-xs font-semibold ${
                transform.flipY ? "bg-violet-600 text-white" : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
              }`}
            >
              Flip Y
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
