"use client";

import { useState } from "react";
import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";
const MATERIALS = [
  "none",
  "metallic",
  "gold",
  "chrome",
  "matte",
  "plastic",
  "glass",
  "holographic",
  "pearl",
  "sparkle",
  "neon",
];

export default function MaterialPanel() {
  const selected = useTemplateStore((s) => s.selectedObject);
  const applyMaterial = useTemplateStore((s) => s.applyMaterialToSelection);
  const [material, setMaterial] = useState("none");
  const [intensity, setIntensity] = useState(0.7);
  const [roughness, setRoughness] = useState(0.25);

  if (!selected) return null;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Material</h3>
        <select
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="rounded border border-neutral-300 px-2 py-1 text-xs dark:border-neutral-700"
        >
          {MATERIALS.map((m) => (
            <option key={m} value={m}>
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-2 text-xs">
        <span className="w-16">Intensity</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="flex-1"
        />
        <span className="w-10 text-right">{intensity.toFixed(2)}</span>
      </label>

      <label className="flex items-center gap-2 text-xs">
        <span className="w-16">Rough</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={roughness}
          onChange={(e) => setRoughness(Number(e.target.value))}
          className="flex-1"
        />
        <span className="w-10 text-right">{roughness.toFixed(2)}</span>
      </label>

      <button
        type="button"
        onClick={() =>
          applyMaterial?.(material, {
            intensity,
            roughness,
          })
        }
        className="rounded border border-neutral-300 px-3 py-2 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700"
      >
        Apply Material
      </button>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="Material preview"
          onError={(e) => (e.currentTarget.src = "/logo.png")}
          className="h-20 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 px-4 text-center text-[11px] font-semibold text-white">
          Preview materials on your design background.
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        Materials are stored on each object. Future shader passes will render metallic, glass, neon, and sparkle effects
        with lighting and 3D transforms.
      </p>
    </div>
  );
}
