"use client";

import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";

export default function AdvancedTypographyPanel() {
  const selected = useTemplateStore((s) => s.selectedObject);
  const typ = useTemplateStore((s) => s.typography);
  const setAxis = useTemplateStore((s) => s.setVariableAxis);
  const toggleFeature = useTemplateStore((s) => s.toggleOpenTypeFeature);
  const setTracking = useTemplateStore((s) => s.setTracking);
  const setLineHeight = useTemplateStore((s) => s.setLineHeightValue);

  if (!selected || (selected.type !== "i-text" && selected.type !== "text" && selected.type !== "variable-text")) {
    return null;
  }

  const axes = [
    { tag: "wght", label: "Weight", min: 100, max: 900 },
    { tag: "wdth", label: "Width", min: 50, max: 200 },
    { tag: "slnt", label: "Slant", min: -15, max: 0 },
    { tag: "opsz", label: "Optical Size", min: 8, max: 72 },
  ];

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Advanced Typography</h3>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="Typography preview"
          onError={(e) => {
            e.currentTarget.src = "/logo.png";
          }}
          className="h-24 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white drop-shadow">
          Aa
        </div>
      </div>

      <div className="space-y-2">
        {axes.map((axis) => (
          <div key={axis.tag} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-300">
              <span>{axis.label}</span>
              <span>{typ.variableAxes?.[axis.tag] ?? axis.min}</span>
            </div>
            <input
              type="range"
              min={axis.min}
              max={axis.max}
              step="1"
              value={typ.variableAxes?.[axis.tag] ?? axis.min}
              onChange={(e) => setAxis(axis.tag, Number(e.target.value))}
              className="accent-violet-500"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={!!typ.opentypeFeatures?.liga}
            onChange={() => toggleFeature("liga")}
          />
          Ligatures
        </label>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={!!typ.opentypeFeatures?.dlig}
            onChange={() => toggleFeature("dlig")}
          />
          Discretionary
        </label>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={!!typ.opentypeFeatures?.ss01}
            onChange={() => toggleFeature("ss01")}
          />
          Stylistic Set 01
        </label>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={!!typ.opentypeFeatures?.onum}
            onChange={() => toggleFeature("onum")}
          />
          Old Style Numerals
        </label>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Tracking</label>
          <input
            type="number"
            value={typ.tracking}
            onChange={(e) => setTracking(Number(e.target.value))}
            className="w-full rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Line Height</label>
          <input
            type="number"
            step="0.05"
            value={typ.lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            className="w-full rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>
      </div>
    </div>
  );
}
