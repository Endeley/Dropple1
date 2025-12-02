"use client";

import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";

export default function ThreeDPanel() {
  const selected = useTemplateStore((s) => s.selectedObject);
  const update3D = useTemplateStore((s) => s.update3D);

  if (!selected) return null;

  const values = selected._3d || {
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    perspective: 800,
    depth: 0,
    vpX: 0.5,
    vpY: 0.5,
  };

  const applyPreset = (preset) => {
    const presets = {
      phoneTilt: { rotateX: -15, rotateY: 25, depth: 60 },
      cardFlip: { rotateY: 75, depth: 80 },
      posterWall: { rotateX: -5, rotateY: -12, depth: 40 },
      billboard: { rotateX: -10, rotateY: 10, depth: 100 },
    };
    if (presets[preset]) update3D(presets[preset]);
  };

  const Slider = ({ label, min, max, step = 1, value, onChange }) => (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-300">
        <span>{label}</span>
        <span>{Math.round(value * 100) / 100}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="accent-violet-500"
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">3D Transform</h3>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="3D preview"
          onError={(e) => {
            e.currentTarget.src = "/logo.png";
          }}
          className="h-20 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white drop-shadow">
          3D Preview
        </div>
      </div>

      <Slider label="Rotate X" min={-90} max={90} value={values.rotateX} onChange={(v) => update3D({ rotateX: v })} />
      <Slider label="Rotate Y" min={-90} max={90} value={values.rotateY} onChange={(v) => update3D({ rotateY: v })} />
      <Slider label="Rotate Z" min={-180} max={180} value={values.rotateZ} onChange={(v) => update3D({ rotateZ: v })} />
      <Slider label="Depth" min={0} max={500} value={values.depth || 0} onChange={(v) => update3D({ depth: v })} />
      <Slider
        label="Perspective Distance"
        min={200}
        max={2000}
        value={values.perspective || 800}
        onChange={(v) => update3D({ perspective: v })}
      />
      <Slider label="Vanishing X" min={0} max={1} step={0.01} value={values.vpX ?? 0.5} onChange={(v) => update3D({ vpX: v })} />
      <Slider label="Vanishing Y" min={0} max={1} step={0.01} value={values.vpY ?? 0.5} onChange={(v) => update3D({ vpY: v })} />

      <div className="grid grid-cols-2 gap-2 text-xs">
        <button
          type="button"
          className="rounded border border-neutral-300 px-2 py-1 font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover:border-violet-400"
          onClick={() => applyPreset("phoneTilt")}
        >
          Phone Tilt
        </button>
        <button
          type="button"
          className="rounded border border-neutral-300 px-2 py-1 font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover-border-violet-400"
          onClick={() => applyPreset("cardFlip")}
        >
          Card Flip
        </button>
        <button
          type="button"
          className="rounded border border-neutral-300 px-2 py-1 font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover-border-violet-400"
          onClick={() => applyPreset("posterWall")}
        >
          Poster Wall
        </button>
        <button
          type="button"
          className="rounded border border-neutral-300 px-2 py-1 font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover-border-violet-400"
          onClick={() => applyPreset("billboard")}
        >
          Billboard
        </button>
      </div>
    </div>
  );
}
