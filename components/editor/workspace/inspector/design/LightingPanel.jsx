"use client";

import { useState } from "react";
import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";

export default function LightingPanel() {
  const selected = useTemplateStore((s) => s.selectedObject);
  const applyLighting = useTemplateStore((s) => s.applyLightingToSelection);

  const [shadowEnabled, setShadowEnabled] = useState(false);
  const [angle, setAngle] = useState(120);
  const [distance, setDistance] = useState(40);
  const [blur, setBlur] = useState(24);
  const [opacity, setOpacity] = useState(0.4);
  const [shadowColor, setShadowColor] = useState("#000000");

  const [reflectionEnabled, setReflectionEnabled] = useState(false);
  const [reflHeight, setReflHeight] = useState(120);
  const [reflOpacity, setReflOpacity] = useState(0.35);
  const [reflBlur, setReflBlur] = useState(10);
  const [reflFalloff, setReflFalloff] = useState(0.5);

  if (!selected) return null;

  const handleApply = () => {
    applyLighting?.({
      shadow: {
        enabled: shadowEnabled,
        angle,
        distance,
        blur,
        opacity,
        color: shadowColor,
      },
      reflection: {
        enabled: reflectionEnabled,
        height: reflHeight,
        opacity: reflOpacity,
        blur: reflBlur,
        falloff: reflFalloff,
      },
    });
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Lighting (Shadows & Reflections)</h3>
      </div>

      <label className="flex items-center gap-2 text-xs">
        <input type="checkbox" checked={shadowEnabled} onChange={(e) => setShadowEnabled(e.target.checked)} />
        Enable Shadow
      </label>
      <SliderRow label="Angle" min={0} max={360} value={angle} onChange={setAngle} />
      <SliderRow label="Distance" min={0} max={300} value={distance} onChange={setDistance} />
      <SliderRow label="Blur" min={0} max={100} value={blur} onChange={setBlur} />
      <SliderRow label="Opacity" min={0} max={1} step={0.01} value={opacity} onChange={setOpacity} />
      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Shadow Color</label>
      <input
        type="color"
        value={shadowColor}
        onChange={(e) => setShadowColor(e.target.value)}
        className="h-8 w-full rounded border border-neutral-300 dark:border-neutral-700"
      />

      <hr className="border-neutral-200 dark:border-neutral-800" />

      <label className="flex items-center gap-2 text-xs">
        <input type="checkbox" checked={reflectionEnabled} onChange={(e) => setReflectionEnabled(e.target.checked)} />
        Enable Reflection
      </label>
      <SliderRow label="Height" min={10} max={300} value={reflHeight} onChange={setReflHeight} />
      <SliderRow label="Opacity" min={0} max={1} step={0.01} value={reflOpacity} onChange={setReflOpacity} />
      <SliderRow label="Blur" min={0} max={30} value={reflBlur} onChange={setReflBlur} />
      <SliderRow label="Falloff" min={0} max={1} step={0.01} value={reflFalloff} onChange={setReflFalloff} />

      <button
        type="button"
        onClick={handleApply}
        className="rounded border border-neutral-300 px-3 py-2 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700"
      >
        Apply Lighting
      </button>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="Lighting preview"
          onError={(e) => (e.currentTarget.src = "/logo.png")}
          className="h-20 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 px-4 text-center text-[11px] font-semibold text-white">
          Shadows & reflections preview on your design background.
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        Non-destructive shadow and reflection settings. Future passes will project perspective shadows and reflective
        fades, matched to your background lighting.
      </p>
    </div>
  );
}

function SliderRow({ label, value, min, max, step = 1, onChange }) {
  return (
    <label className="flex items-center gap-2 text-xs">
      <span className="w-16 text-neutral-700 dark:text-neutral-200">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1"
      />
      <span className="w-10 text-right text-neutral-600 dark:text-neutral-300">
        {typeof value === "number" ? (value >= 1 ? value.toFixed(0) : value.toFixed(2)) : value}
      </span>
    </label>
  );
}
