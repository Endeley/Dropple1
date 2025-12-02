"use client";

import { useState } from "react";
import { updateBrand } from "./brandApi";

export default function TypographyManager({ brand }) {
  const [typography, setTypography] = useState(brand.typography || {});
  const [error, setError] = useState(null);

  const save = async () => {
    setError(null);
    try {
      const updated = await updateBrand(brand.id, { typography });
      setTypography(updated.typography || {});
    } catch (err) {
      setError(err?.message || "Failed to save typography");
    }
  };

  const setValue = (key, value) => setTypography({ ...typography, [key]: value });

  return (
    <div className="rounded-lg border border-white/10 bg-black/30 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 text-sm font-semibold">Typography</h3>
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
          <span className="w-32">Heading</span>
          <input
            value={typography.heading?.font || ""}
            onChange={(e) => setValue("heading", { ...(typography.heading || {}), font: e.target.value })}
            className="flex-1 rounded-md border border-white/10 bg-white/5 p-1"
            placeholder="Font family"
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-32">Body</span>
          <input
            value={typography.body?.font || ""}
            onChange={(e) => setValue("body", { ...(typography.body || {}), font: e.target.value })}
            className="flex-1 rounded-md border border-white/10 bg-white/5 p-1"
            placeholder="Font family"
          />
        </label>
      </div>
    </div>
  );
}
