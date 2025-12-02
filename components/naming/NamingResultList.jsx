"use client";

import { useMemo } from "react";
import { Check, Globe2, Sparkles } from "lucide-react";

const ScoreChip = ({ label, value }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-[10px] font-semibold text-neutral-700 shadow-sm ring-1 ring-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:ring-neutral-700">
    <Sparkles size={12} /> {label}: {value}
  </span>
);

export default function NamingResultList({ results = [], onUse, loading, compact = false, lastApplied }) {
  const displayResults = useMemo(() => {
    if (!Array.isArray(results)) return [];
    if (compact) return results.slice(0, 6);
    return results;
  }, [results, compact]);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: compact ? 2 : 3 }).map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse rounded-xl border border-neutral-200 bg-white px-3 py-3 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="h-4 w-32 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="mt-2 h-3 w-48 rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>
        ))}
      </div>
    );
  }

  if (!displayResults.length) {
    return (
      <div className="rounded-xl border border-dashed border-neutral-300 p-4 text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-300">
        No names yet. Try a prompt and tone to see AJ&apos;s ideas.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {displayResults.map((item, idx) => (
        <div
          key={`${item.name}-${idx}`}
          className="rounded-xl border border-neutral-200 bg-white px-3 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-semibold text-neutral-900 dark:text-white">{item.name}</h4>
                {lastApplied === item.name && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200">
                    <Check size={12} /> Used
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {item.tone || "Tone"} - {item.type || "Name"} - {item.language || "Language"}
              </p>
            </div>
            {onUse && (
              <button
                type="button"
                onClick={() => onUse(item.name, item)}
                className="rounded-lg bg-violet-600 px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-violet-500 active:translate-y-[1px]"
              >
                Use Name
              </button>
            )}
          </div>

          {item.meaning && (
            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-200">{item.meaning}</p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
            <ScoreChip label="Memorability" value={item.memorabilityScore ?? "-"} />
            <ScoreChip label="Length" value={item.lengthScore ?? "-"} />
            <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1 text-[10px] font-semibold text-neutral-600 ring-1 ring-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:ring-neutral-700">
              <Globe2 size={12} />
              {item.domainAvailable ? "Domain looks open" : "Domain TBD"}
            </span>
            {item.reason && (
              <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-700 ring-1 ring-amber-200 dark:bg-amber-900/40 dark:text-amber-200 dark:ring-amber-800/60">
                {item.reason}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
