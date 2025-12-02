"use client";

import { useState } from "react";
import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";
const TYPES = ["grain", "noise", "paper", "canvas", "fabric", "halftone", "dither", "sparkle", "film-dust"];
const BLENDS = ["multiply", "overlay", "soft-light", "screen"];

export default function TexturePanel() {
  const selected = useTemplateStore((s) => s.selectedObject);
  const applyTexture = useTemplateStore((s) => s.applyTextureToSelection);
  const [type, setType] = useState("grain");
  const [intensity, setIntensity] = useState(0.3);
  const [scale, setScale] = useState(1);
  const [color, setColor] = useState("#000000");
  const [blendMode, setBlendMode] = useState("multiply");
  const [enabled, setEnabled] = useState(false);

  if (!selected) return null;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Texture</h3>
        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="h-4 w-4"
          />
          Enable
        </label>
      </div>

      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Type</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="rounded border border-neutral-300 px-2 py-1 text-xs dark:border-neutral-700"
      >
        {TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Intensity</label>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={intensity}
        onChange={(e) => setIntensity(Number(e.target.value))}
      />

      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Scale</label>
      <input
        type="range"
        min={0.5}
        max={8}
        step={0.1}
        value={scale}
        onChange={(e) => setScale(Number(e.target.value))}
      />

      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Texture Color</label>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="h-8 w-full rounded border border-neutral-300 dark:border-neutral-700"
      />

      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Blend</label>
      <select
        value={blendMode}
        onChange={(e) => setBlendMode(e.target.value)}
        className="rounded border border-neutral-300 px-2 py-1 text-xs dark:border-neutral-700"
      >
        {BLENDS.map((b) => (
          <option key={b}>{b}</option>
        ))}
      </select>

      <button
        type="button"
        onClick={() =>
          applyTexture?.({
            enabled,
            type,
            intensity,
            scale,
            color,
            blendMode,
          })
        }
        className="rounded border border-neutral-300 px-3 py-2 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700"
      >
        Apply Texture
      </button>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="Texture preview"
          onError={(e) => (e.currentTarget.src = "/logo.png")}
          className="h-20 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 px-4 text-center text-[11px] font-semibold text-white">
          Texture preview on your template background.
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        Non-destructive textures for shapes, text, and vectors. Future shader pass will add GPU grain/noise/halftone
        while staying export-safe.
      </p>
    </div>
  );
}
