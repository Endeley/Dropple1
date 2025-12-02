"use client";

import { useEffect } from "react";
import { useHistorySearch } from "@/canvas/core/history/useHistorySearch";
import { useCommandPalette } from "./CommandPaletteProvider";
import { useHistoryStore } from "@/stores/useHistoryStore";

export default function HistorySearchPalette() {
  const { open, setOpen } = useCommandPalette();
  const { query, setQuery, results } = useHistorySearch();
  const jumpTo = useHistoryStore((state) => state.jumpTo);

  useEffect(() => {
    if (!open) return;
    const handler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 z-[6000] flex items-start justify-center pt-24"
      onClick={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div className="w-[600px] bg-white dark:bg-neutral-900 rounded-xl shadow-2xl overflow-hidden">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search history…"
          className="w-full px-4 py-3 text-sm bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 outline-none"
        />
        <div className="max-h-[320px] overflow-y-auto">
          {results.map((entry) => (
            <button
              key={entry.index}
              onClick={() => {
                jumpTo?.(entry.index);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition flex flex-col gap-1"
            >
              <div className="text-sm font-medium">{entry.label}</div>
              <div className="text-xs opacity-60">
                {entry.category} • {new Date(entry.timestamp).toLocaleTimeString()}
              </div>
            </button>
          ))}
          {!results.length && query && (
            <div className="px-4 py-4 text-xs opacity-60">No matching history.</div>
          )}
        </div>
      </div>
    </div>
  );
}
