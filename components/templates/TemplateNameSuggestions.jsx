"use client";

export default function TemplateNameSuggestions({ list = [], onUse }) {
  if (!list.length) return null;

  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      {list.map((item, i) => (
        <div
          key={`${item?.name || "name"}-${i}`}
          className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
        >
          <h3 className="text-lg text-purple-300">{item.name}</h3>
          <p className="text-xs text-white/60">{item.meaning}</p>
          <button
            onClick={() => onUse?.(item)}
            className="mt-3 w-full rounded-md bg-purple-700 py-1 text-sm text-white transition hover:bg-purple-600"
            type="button"
          >
            Use Name
          </button>
        </div>
      ))}
    </div>
  );
}
