"use client";

import { useState } from "react";
import TemplateNameSuggestions from "./TemplateNameSuggestions";
import { autoTemplateName } from "@/lib/templates/autoTemplateName";

export default function TemplateCreator({ template: initialTemplate = null, onUseName }) {
  const [template, setTemplate] = useState(initialTemplate);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateNames = async () => {
    if (!template) return;

    setLoading(true);
    const names = await autoTemplateName(template);
    setSuggestions(names);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="mb-3 text-xl text-white/70">New Template</h2>

      <div className="flex items-center gap-3">
        <button
          onClick={handleGenerateNames}
          className="rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Analyzing…" : "Generate AI Name"}
        </button>
        <button
          onClick={() => setTemplate(initialTemplate)}
          className="text-xs text-white/50 transition hover:text-white"
          type="button"
        >
          Reload template data
        </button>
      </div>

      <TemplateNameSuggestions
        list={suggestions}
        onUse={(item) => {
          onUseName?.(item?.name);
        }}
      />
    </div>
  );
}
