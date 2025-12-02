"use client";

import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";

export default function TextEffectsInspector() {
  const selected = useTemplateStore((s) => s.selectedObject);
  const addGlowToText = useTemplateStore((s) => s.addGlowToText);
  const applyLiftEffect = useTemplateStore((s) => s.applyLiftEffect);
  const setHollowText = useTemplateStore((s) => s.setHollowText);
  const setTextOutline = useTemplateStore((s) => s.setTextOutline);
  const setTextShadow = useTemplateStore((s) => s.setTextShadow);
  const applyTextBackground = useTemplateStore((s) => s.applyTextBackground);

  if (!selected || (selected.type !== "i-text" && selected.type !== "text")) return null;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Text Effects</h3>

      <img
        src={PREVIEW_SRC}
        onError={(e) => {
          e.currentTarget.src = "/logo.png";
        }}
        alt="Effect preview"
        className="h-32 w-full rounded-md object-cover"
      />

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="rounded border border-neutral-300 px-2 py-2 text-xs font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover:border-violet-400"
          onClick={() => addGlowToText("rgba(255,255,255,0.9)", 25)}
        >
          Glow
        </button>
        <button
          type="button"
          className="rounded border border-neutral-300 px-2 py-2 text-xs font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover:border-violet-400"
          onClick={() => applyLiftEffect()}
        >
          Lift
        </button>
        <button
          type="button"
          className="rounded border border-neutral-300 px-2 py-2 text-xs font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover-border-violet-400"
          onClick={() => setHollowText()}
        >
          Hollow
        </button>
        <button
          type="button"
          className="rounded border border-neutral-300 px-2 py-2 text-xs font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover-border-violet-400"
          onClick={() => setTextOutline("#ffffff", 3)}
        >
          Outline
        </button>
        <button
          type="button"
          className="rounded border border-neutral-300 px-2 py-2 text-xs font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover-border-violet-400"
          onClick={() =>
            setTextShadow({ offsetX: 4, offsetY: 4, blur: 10, color: "rgba(0,0,0,0.5)" })
          }
        >
          Shadow
        </button>
        <button
          type="button"
          className="rounded border border-neutral-300 px-2 py-2 text-xs font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover-border-violet-400"
          onClick={() => applyTextBackground(16, "rgba(0,0,0,0.6)")}
        >
          Bg Block
        </button>
      </div>
    </div>
  );
}
