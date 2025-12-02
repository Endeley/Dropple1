"use client";

import { Eye, EyeOff, Lock, Unlock, Trash2 } from "lucide-react";
import { useTemplateStore } from "@/stores/useTemplateStore";

export default function LayerItem({ layer, onHover }) {
  const toggleVisibility = useTemplateStore((s) => s.toggleVisibility);
  const lockSelected = useTemplateStore((s) => s.lockSelected);
  const unlockObject = useTemplateStore((s) => s.unlockObject);
  const renameLayer = useTemplateStore((s) => s.renameLayer);
  const selectObject = useTemplateStore((s) => s.selectObject);
  const deleteObject = useTemplateStore((s) => s.deleteObject);

  return (
    <div
      className="flex items-center gap-2 rounded-md border border-neutral-200 px-2 py-1 text-sm transition hover:border-violet-400 hover:bg-violet-50 dark:border-neutral-700 dark:hover:border-violet-500/40 dark:hover:bg-neutral-800"
      onMouseEnter={() => onHover?.(layer.ref)}
      onMouseLeave={() => onHover?.(null)}
      onClick={() => selectObject(layer.ref)}
    >
      <button
        type="button"
        className="p-1 hover:text-violet-500"
        onClick={(e) => {
          e.stopPropagation();
          toggleVisibility(layer.ref);
        }}
      >
        {layer.visible ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>

      <button
        type="button"
        className="p-1 hover:text-violet-500"
        onClick={(e) => {
          e.stopPropagation();
          layer.locked ? unlockObject(layer.ref) : lockSelected();
        }}
      >
        {layer.locked ? <Lock size={16} /> : <Unlock size={16} />}
      </button>

      <input
        className="flex-1 rounded border border-transparent bg-transparent px-1 py-0.5 text-sm outline-none focus:border-violet-400 dark:text-white"
        defaultValue={layer.name}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => renameLayer(layer.ref, e.target.value)}
      />

      <button
        type="button"
        className="p-1 text-rose-500 hover:text-rose-600"
        onClick={(e) => {
          e.stopPropagation();
          deleteObject(layer.ref);
        }}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
