"use client";

import { useState } from "react";
import { updateBrand } from "./brandApi";

export default function BrandAISettings({ brand }) {
  const [aiMemory, setAiMemory] = useState(brand.aiMemory || {});
  const [error, setError] = useState(null);

  const save = async () => {
    setError(null);
    try {
      const updated = await updateBrand(brand.id, { aiMemory });
      setAiMemory(updated.aiMemory || {});
    } catch (err) {
      setError(err?.message || "Failed to save AI settings");
    }
  };

  const setValue = (key, value) => setAiMemory({ ...aiMemory, [key]: value });

  return (
    <div className="rounded-lg border border-white/10 bg-black/30 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 text-sm font-semibold">AI Brand Memory</h3>
        <button
          onClick={save}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold text-white hover:bg-purple-700"
          type="button"
        >
          Save
        </button>
      </div>
      {error && <p className="mt-1 text-xs font-semibold text-rose-400">{error}</p>}
      <div className="mt-2 space-y-2 text-xs">
        <label className="flex flex-col gap-1">
          <span className="text-white/70">Voice / Tone</span>
          <textarea
            value={aiMemory.voice || ""}
            onChange={(e) => setValue("voice", e.target.value)}
            className="rounded-md border border-white/10 bg-white/5 p-2"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-white/70">Visual Metaphors</span>
          <textarea
            value={aiMemory.visuals || ""}
            onChange={(e) => setValue("visuals", e.target.value)}
            className="rounded-md border border-white/10 bg-white/5 p-2"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-white/70">Preferred Layouts</span>
          <textarea
            value={aiMemory.layouts || ""}
            onChange={(e) => setValue("layouts", e.target.value)}
            className="rounded-md border border-white/10 bg-white/5 p-2"
          />
        </label>
      </div>
    </div>
  );
}
