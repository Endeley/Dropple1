"use client";

import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";

export default function PhysicsPanel() {
  const selected = useTemplateStore((s) => s.selectedObject);
  const togglePhysics = useTemplateStore((s) => s.togglePhysicsEnabled);
  const updatePhysics = useTemplateStore((s) => s.updatePhysicsProps);
  const physicsDefaults = useTemplateStore((s) => s.physicsDefaults);

  if (!selected) return null;

  const physics = selected.physics || physicsDefaults;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Physics</h3>
        <button
          type="button"
          onClick={togglePhysics}
          className={`rounded px-3 py-1 text-xs font-semibold border ${
            physics?.enabled
              ? "border-emerald-500 text-emerald-600"
              : "border-neutral-300 hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700"
          }`}
        >
          {physics?.enabled ? "On" : "Enable"}
        </button>
      </div>

      <div className="space-y-2 text-xs">
        <SliderRow label="Gravity" value={physics?.gravity ?? 0} min={0} max={5} step={0.1} onChange={(v) => updatePhysics({ gravity: v })} />
        <SliderRow label="Friction" value={physics?.friction ?? 0.1} min={0} max={1} step={0.01} onChange={(v) => updatePhysics({ friction: v })} />
        <SliderRow label="Bounce" value={physics?.bounce ?? 0.2} min={0} max={1.5} step={0.05} onChange={(v) => updatePhysics({ bounce: v })} />
        <SliderRow label="Drag" value={physics?.drag ?? 0} min={0} max={2} step={0.01} onChange={(v) => updatePhysics({ drag: v })} />
        <SliderRow label="Spring" value={physics?.springStrength ?? 0} min={0} max={1} step={0.01} onChange={(v) => updatePhysics({ springStrength: v })} />
        <SliderRow label="Mass" value={physics?.mass ?? 1} min={0.1} max={5} step={0.1} onChange={(v) => updatePhysics({ mass: v })} />
      </div>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="Physics preview"
          onError={(e) => (e.currentTarget.src = "/logo.png")}
          className="h-20 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/20 to-black/10 text-[11px] font-semibold text-white">
          Physics Preview
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        Physics is stored on each object: gravity, bounce, drag, and spring strength. Toggle to simulate natural motion
        and inertia; playback uses the global physics loop.
      </p>
    </div>
  );
}

function SliderRow({ label, value, min, max, step, onChange }) {
  return (
    <label className="flex items-center gap-2">
      <span className="w-20 text-neutral-700 dark:text-neutral-200">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1"
      />
      <span className="w-12 text-right text-neutral-600 dark:text-neutral-300">{value?.toFixed ? value.toFixed(2) : value}</span>
    </label>
  );
}
