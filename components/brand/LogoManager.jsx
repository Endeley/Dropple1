"use client";

import { useState } from "react";
import { updateBrand } from "./brandApi";

export default function LogoManager({ brand }) {
  const [logos, setLogos] = useState(brand.logos || {});
  const [error, setError] = useState(null);

  const save = async () => {
    setError(null);
    try {
      const updated = await updateBrand(brand.id, { logos });
      setLogos(updated.logos || {});
    } catch (err) {
      setError(err?.message || "Failed to save logos");
    }
  };

  const setValue = (key, value) => setLogos({ ...logos, [key]: value });

  return (
    <div className="rounded-lg border border-white/10 bg-black/30 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 text-sm font-semibold">Logos</h3>
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
        <label className="flex items-center gap-2">
          <span className="w-32">Primary Logo URL/Base64</span>
          <input
            value={logos.primary || ""}
            onChange={(e) => setValue("primary", e.target.value)}
            className="flex-1 rounded-md border border-white/10 bg-white/5 p-1"
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-32">Monochrome</span>
          <input
            value={logos.mono || ""}
            onChange={(e) => setValue("mono", e.target.value)}
            className="flex-1 rounded-md border border-white/10 bg-white/5 p-1"
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-32">Icon</span>
          <input
            value={logos.icon || ""}
            onChange={(e) => setValue("icon", e.target.value)}
            className="flex-1 rounded-md border border-white/10 bg-white/5 p-1"
          />
        </label>
      </div>
    </div>
  );
}
