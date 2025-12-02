"use client";

import { useEffect } from "react";
import { autoTemplateName } from "@/lib/templates/autoTemplateName";
import TemplateNameSuggestions from "./TemplateNameSuggestions";

export default function TemplateSaveModal({ open, onClose, template, templateName, setTemplateName, suggestions = [], setSuggestions = () => {} }) {
  useEffect(() => {
    if (!open) return;
    if (!template || !setTemplateName) return;
    if (templateName && templateName !== "Untitled Template") return;

    autoTemplateName(template).then((names) => {
      if (names?.[0]) setTemplateName(names[0].name);
      setSuggestions(names || []);
    });
  }, [open, template, templateName, setTemplateName, setSuggestions]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4 backdrop-blur">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-black/60 p-5 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Save Template</h3>
          <button onClick={onClose} className="text-white/50 transition hover:text-white" type="button">
            Close
          </button>
        </div>

        <label className="mt-4 block text-sm text-white/70">Template Name</label>
        <input
          value={templateName}
          onChange={(e) => setTemplateName?.(e.target.value)}
          className="mt-1 w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm outline-none placeholder:text-white/40"
          placeholder="Name this template"
        />

        <TemplateNameSuggestions
          list={suggestions}
          onUse={(item) => {
            setTemplateName?.(item?.name || templateName);
          }}
        />
      </div>
    </div>
  );
}
