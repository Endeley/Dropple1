"use client";

import { useState } from "react";
import { updateBrand } from "./brandApi";

export default function ColorManager({ brand }) {
  const [colors, setColors] = useState(brand.colors || {});
  const [error, setError] = useState(null);

  const save = async () => {
    setError(null);
    try {
      const updated = await updateBrand(brand.id, { colors });
      setColors(updated.colors || {});
    } catch (err) {
      setError(err?.message || "Failed to save colors");
    }
  };

  const setColor = (key, value) => setColors({ ...colors, [key]: value });

  const entries = Object.entries(colors);

  return (
    <div className="rounded-lg border border-white/10 bg-black/30 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 text-sm font-semibold">Colors</h3>
        <button
          onClick={save}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold text-white hover:bg-purple-700"
          type="button"
        >
          Save
        </button>
      </div>
      {error && <p className="mt-1 text-xs font-semibold text-rose-400">{error}</p>}
      <div className="mt-2 space-y-2">
        {entries.map(([k, v]) => (
          <div key={k} className="flex items-center gap-2 text-xs">
            <span className="w-40 font-mono">{k}</span>
            <input
              value={v}
              onChange={(e) => setColor(k, e.target.value)}
              className="flex-1 rounded-md border border-white/10 bg-white/5 p-1"
            />
            <div className="h-4 w-8 rounded border border-white/20" style={{ background: v }} />
          </div>
        ))}
        {!entries.length && <p className="text-xs text-white/50">No colors yet. Add keys like primary/secondary.</p>}
      </div>
    </div>
  );
}
