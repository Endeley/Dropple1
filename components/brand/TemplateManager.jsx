"use client";

import { useState } from "react";
import { updateBrand } from "./brandApi";

export default function TemplateManager({ brand }) {
  const [templates, setTemplates] = useState(brand.templates || []);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");

  const save = async () => {
    setError(null);
    try {
      const updated = await updateBrand(brand.id, { templates });
      setTemplates(updated.templates || []);
    } catch (err) {
      setError(err?.message || "Failed to save templates");
    }
  };

  const addTemplate = () => {
    if (!input.trim()) return;
    setTemplates([...templates, input.trim()]);
    setInput("");
  };

  return (
    <div className="rounded-lg border border-white/10 bg-black/30 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 text-sm font-semibold">Brand Templates</h3>
        <button
          onClick={save}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold text-white hover:bg-purple-700"
          type="button"
        >
          Save
        </button>
      </div>
      {error && <p className="mt-1 text-xs font-semibold text-rose-400">{error}</p>}

      <div className="mt-2 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Template ID or name"
          className="flex-1 rounded-md border border-white/10 bg-white/5 p-2 text-xs"
        />
        <button
          onClick={addTemplate}
          className="rounded-md bg-purple-600 px-3 py-2 text-xs font-semibold text-white hover:bg-purple-700"
          type="button"
        >
          Add
        </button>
      </div>

      <div className="mt-3 space-y-1 text-xs">
        {templates.map((t, i) => (
          <div key={i} className="rounded-md border border-white/10 bg-white/5 px-3 py-2">
            {t}
          </div>
        ))}
        {!templates.length && <p className="text-xs text-white/50">No templates linked yet.</p>}
      </div>
    </div>
  );
}
