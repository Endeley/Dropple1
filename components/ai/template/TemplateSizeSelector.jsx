"use client";

import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

const sizes = [
  { id: "1080x1080", label: "Square" },
  { id: "1080x1350", label: "Portrait" },
  { id: "1920x1080", label: "Landscape" },
  { id: "2480x3508", label: "A4 Vertical" },
];

export default function TemplateSizeSelector({ value, onChange }) {
  const templateSizeState = useAIStudioStore((s) => s.templateSize);
  const setTemplateSizeState = useAIStudioStore((s) => s.setTemplateSize);
  const templateSize = value ?? templateSizeState;
  const setTemplateSize = onChange ?? setTemplateSizeState;

  return (
    <div className="space-y-2">
      <p className="text-sm text-white/80">Size</p>
      <select
        value={templateSize}
        onChange={(e) => setTemplateSize(e.target.value)}
        className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-violet-500/50"
      >
        {sizes.map((size) => (
          <option key={size.id} value={size.id}>
            {size.label} ({size.id})
          </option>
        ))}
      </select>
    </div>
  );
}
