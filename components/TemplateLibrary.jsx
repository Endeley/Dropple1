"use client";

import { useEffect, useState } from "react";
import { useTemplateStore } from "@/stores/useTemplateStore";
import { insertTemplate } from "@/engines/templates/insertTemplate";
import { autoTemplateName } from "@/lib/templates/autoTemplateName";

export default function TemplateLibrary({ canvas }) {
  const templates = useTemplateStore((s) => s.templates);
  const [fallbackNames, setFallbackNames] = useState({});

  const handleClick = (id) => {
    insertTemplate(canvas, id, "merge");
  };

  useEffect(() => {
    const entries = Object.values(templates || {}).filter((tpl) => !tpl?.name);
    if (!entries.length) return;

    const run = async () => {
      const updates = {};
      for (const tpl of entries) {
        const names = await autoTemplateName(tpl);
        if (names?.[0]?.name) {
          updates[tpl.id] = names[0].name;
        }
      }
      if (Object.keys(updates).length) {
        setFallbackNames((prev) => ({ ...prev, ...updates }));
      }
    };

    run();
  }, [templates]);

  return (
    <div className="w-64 bg-zinc-900 text-white p-4 overflow-y-auto h-full">
      <h2 className="text-lg font-semibold mb-4">Templates</h2>

      <div className="grid grid-cols-1 gap-4">
        {Object.values(templates).map((tpl) => (
          <div
            key={tpl.id}
            className="rounded-lg overflow-hidden cursor-pointer bg-zinc-800 hover:bg-zinc-700 transition"
            onClick={() => handleClick(tpl.id)}
          >
            <img src={tpl.preview} className="w-full object-cover" />
            <div className="p-2 text-sm">
              <p className="font-medium">{tpl.name || fallbackNames[tpl.id] || "New Template"}</p>
              <p className="text-xs text-zinc-400">{tpl.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
