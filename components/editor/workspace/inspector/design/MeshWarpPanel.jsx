"use client";

import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";

export default function MeshWarpPanel() {
  const selected = useTemplateStore((s) => s.selectedObject);
  const meshEnabled = useTemplateStore((s) => s.meshWarpEnabled);
  const meshGrid = useTemplateStore((s) => s.meshGrid);
  const liquifyBrush = useTemplateStore((s) => s.liquifyBrush);
  const toggleMeshWarp = useTemplateStore((s) => s.toggleMeshWarpEnabled);
  const setMeshGrid = useTemplateStore((s) => s.setMeshGrid);
  const resetMesh = useTemplateStore((s) => s.resetMeshWarp);
  const setLiquify = useTemplateStore((s) => s.setLiquifyBrush);
  const addPuppetPin = useTemplateStore((s) => s.addPuppetPin);

  if (!selected) return null;

  const disabled = !selected;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Mesh / Liquify / Puppet</h3>
        <button
          type="button"
          onClick={toggleMeshWarp}
          disabled={disabled}
          className={`rounded px-3 py-1 text-xs font-semibold border ${
            meshEnabled
              ? "border-emerald-500 text-emerald-600"
              : "border-neutral-300 hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700"
          }`}
        >
          {meshEnabled ? "Mesh On" : "Enable Mesh"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <label className="flex items-center gap-2">
          <span>Rows</span>
          <input
            type="number"
            min={2}
            max={12}
            value={meshGrid.rows}
            onChange={(e) => setMeshGrid(Number(e.target.value), meshGrid.cols)}
            className="w-16 rounded border border-neutral-300 px-2 py-1 text-xs dark:border-neutral-700"
          />
        </label>
        <label className="flex items-center gap-2">
          <span>Cols</span>
          <input
            type="number"
            min={2}
            max={12}
            value={meshGrid.cols}
            onChange={(e) => setMeshGrid(meshGrid.rows, Number(e.target.value))}
            className="w-16 rounded border border-neutral-300 px-2 py-1 text-xs dark:border-neutral-700"
          />
        </label>
        <button
          type="button"
          onClick={resetMesh}
          className="col-span-2 rounded border border-neutral-300 px-3 py-1 font-semibold hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700"
        >
          Reset Mesh
        </button>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span>Brush</span>
          <input
            type="range"
            min={10}
            max={300}
            value={liquifyBrush.size}
            onChange={(e) => setLiquify({ size: Number(e.target.value) })}
          />
          <span>{liquifyBrush.size}px</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span>Strength</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={liquifyBrush.strength}
            onChange={(e) => setLiquify({ strength: Number(e.target.value) })}
          />
          <span>{liquifyBrush.strength.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={addPuppetPin}
        className="rounded border border-neutral-300 px-3 py-1 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700"
      >
        Add Puppet Pin
      </button>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="Mesh preview"
          onError={(e) => (e.currentTarget.src = "/logo.png")}
          className="h-20 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/20 to-black/10 text-[11px] font-semibold text-white">
          Warp Preview
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        Mesh, liquify, and puppet warp are scaffolded here. Mesh data and pins are stored on the selected object so you
        can animate or reset later.
      </p>
    </div>
  );
}
