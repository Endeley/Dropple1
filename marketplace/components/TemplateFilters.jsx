"use client";

import { MODE_CARDS } from "@/packages/mode-registry";
import { useMarketplaceStore } from "../store/useMarketplaceStore";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "social", label: "Social" },
  { id: "business", label: "Business" },
];

export default function TemplateFilters() {
  const activeCategory = useMarketplaceStore((s) => s.activeCategory);
  const activeMode = useMarketplaceStore((s) => s.activeMode);
  const searchTerm = useMarketplaceStore((s) => s.searchTerm);
  const setCategory = useMarketplaceStore((s) => s.setCategory);
  const setSearchTerm = useMarketplaceStore((s) => s.setSearchTerm);
  const setActiveMode = useMarketplaceStore((s) => s.setActiveMode);

  return (
    <div className="w-64 border-r border-neutral-200 dark:border-neutral-800 p-4 flex flex-col gap-6">
      <h3 className="text-lg font-semibold">Templates</h3>

      <input
        type="text"
        placeholder="Search templates..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-3 py-2 rounded border bg-neutral-50 dark:bg-neutral-900"
      />

      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">Category</p>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`text-left px-2 py-1 rounded ${
              activeCategory === cat.id
                ? "bg-neutral-200 dark:bg-neutral-800"
                : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">Mode</p>
        <button
          onClick={() => setActiveMode("all")}
          className={`text-left px-2 py-1 rounded ${
            activeMode === "all"
              ? "bg-neutral-200 dark:bg-neutral-800"
              : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
          }`}
        >
          All modes
        </button>
        {MODE_CARDS.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className={`text-left px-2 py-1 rounded ${
              activeMode === mode.id
                ? "bg-neutral-200 dark:bg-neutral-800"
                : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </div>
  );
}
