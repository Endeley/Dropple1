"use client";

import { ChevronDown, LayoutTemplate, MonitorPlay, Wand2 } from "lucide-react";
import { usePanelsStore } from "@/stores/panelsStore";

export default function TopBar() {
  const toggleTemplateBrowser = usePanelsStore((s) => s.toggleTemplateBrowser);

  return (
    <header className="flex h-12 items-center justify-between border-b border-slate-900 bg-gradient-to-r from-violet-900/70 via-slate-950/80 to-fuchsia-900/70 px-3">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/80 text-xs font-bold shadow-md shadow-violet-500/40">
          D
        </div>
        <div>
          <div className="flex items-center gap-1 text-xs text-slate-300">
            <span className="font-medium">Dropple</span>
            <span className="opacity-60">/</span>
            <span className="opacity-80">UI/UX Workspace</span>
          </div>
          <div className="text-[11px] text-slate-400">Studio Dashboard Concept</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-1 rounded-md border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-xs text-slate-200 transition hover:bg-slate-800/80">
          Page: Default
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-1 rounded-md border border-slate-800 bg-slate-900/70 px-2.5 py-1 text-[11px] text-slate-200 transition hover:bg-slate-800/70">
          <MonitorPlay className="h-3.5 w-3.5" />
          Preview
        </button>
        <button className="inline-flex items-center gap-1 rounded-md border border-violet-600 bg-violet-600/90 px-2.5 py-1 text-[11px] font-medium text-white shadow shadow-violet-600/50 transition hover:bg-violet-500">
          <Wand2 className="h-3.5 w-3.5" />
          Auto-layout
        </button>
        <button
          onClick={toggleTemplateBrowser}
          className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-900/70 px-2 py-1 text-[11px] text-slate-200 transition hover:bg-slate-800/80"
        >
          <LayoutTemplate className="h-3.5 w-3.5" />
          Templates
        </button>
      </div>
    </header>
  );
}
