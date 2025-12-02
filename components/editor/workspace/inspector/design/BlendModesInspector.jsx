"use client";

import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";

export default function BlendModesInspector() {
  const selected = useTemplateStore((s) => s.selectedObject);
  const blendList = useTemplateStore((s) => s.blendModeOptions);
  const setBlendMode = useTemplateStore((s) => s.setBlendMode);

  if (!selected) return null;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Blend Mode</label>
      <select
        className="rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900"
        value={selected.globalCompositeOperation || "normal"}
        onChange={(e) => setBlendMode(e.target.value)}
      >
        {blendList.map((mode) => (
          <option key={mode} value={mode}>
            {mode.replace("-", " ")}
          </option>
        ))}
      </select>

      <div className="mt-2 rounded-lg border border-neutral-200 p-1 dark:border-neutral-800">
        <img
          src={PREVIEW_SRC}
          onError={(e) => {
            e.currentTarget.src = "/logo.png";
          }}
          alt="Blend preview"
          style={{
            width: "100%",
            borderRadius: "6px",
            mixBlendMode: selected?.globalCompositeOperation || "normal",
          }}
        />
      </div>
    </div>
  );
}
