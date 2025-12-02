"use client";

import { useComponentStore } from "@/canvas/components/componentStore";
import { addVariant } from "@/canvas/components/addVariant";

export default function VariantManagerPanel({ master }) {
  const variants = useComponentStore((state) => state.variants[master.id] || {});

  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded-lg p-3 text-sm space-y-2">
      <div className="text-xs text-neutral-400 font-semibold">VARIANTS</div>
      {Object.keys(variants).length === 0 && (
        <div className="text-neutral-500 text-xs">No variants yet.</div>
      )}
      {Object.keys(variants).map((key) => (
        <div key={key} className="bg-neutral-800/60 rounded px-2 py-1">
          {key}
        </div>
      ))}
      <button
        className="w-full bg-neutral-800 px-3 py-2 rounded hover:bg-neutral-700 text-xs"
        onClick={() => addVariant(master.id, `Variant ${Object.keys(variants).length + 1}`)}
      >
        + Add Variant
      </button>
    </div>
  );
}
