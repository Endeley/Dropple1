"use client";

export default function AIReplacePrompt({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-300">Replacement Prompt</label>
      <textarea
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-black/30 border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-violet-500/50"
        placeholder="Describe what should replace the selected area..."
      />
    </div>
  );
}
