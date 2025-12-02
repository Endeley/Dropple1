"use client";

import { useEffect, useState } from "react";
import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";

export default function HistoryTimeline() {
  const [versions, setVersions] = useState([]);
  const [selected, setSelected] = useState(null);
  const loadVersions = async () => {
    try {
      const res = await fetch("/api/versions/list").then((r) => r.json());
      setVersions(res?.versions || []);
      setSelected(res?.versions?.[0] || null);
    } catch (e) {
      console.warn("Failed to load versions", e);
    }
  };

  useEffect(() => {
    loadVersions();
  }, []);

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Version History</h3>

      <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
        {versions.map((v) => (
          <button
            key={v.versionNumber}
            onClick={() => setSelected(v)}
            className={`flex flex-col items-start rounded border px-3 py-2 text-xs ${
              selected?.versionNumber === v.versionNumber
                ? "border-violet-400 text-violet-700"
                : "border-neutral-300 dark:border-neutral-700"
            }`}
          >
            <span className="font-semibold">v{v.versionNumber}</span>
            {v.label && <span className="text-[11px] text-neutral-500">{v.label}</span>}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="History preview"
          onError={(e) => (e.currentTarget.src = "/logo.png")}
          className="h-24 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 px-4 text-center text-[11px] font-semibold text-white">
          Preview versions on your template background.
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        View snapshots, scrub time, and restore versions. The preview overlays the version on your design mockup for
        context.
      </p>
    </div>
  );
}
