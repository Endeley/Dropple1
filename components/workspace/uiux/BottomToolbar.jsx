"use client";

import {
  Grid3X3,
  LayoutPanelTop,
  MonitorSmartphone,
  Ruler,
  Sparkles,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

export default function BottomToolbar() {
  return (
    <footer className="flex h-9 items-center justify-between border-t border-slate-900 bg-slate-950/95 px-3 text-[11px] text-slate-300">
      <div className="flex items-center gap-3">
        <button className="inline-flex items-center gap-1 rounded-md border border-slate-800 bg-slate-900/80 px-1.5 py-1 hover:bg-slate-800/80">
          <LayoutPanelTop className="h-3.5 w-3.5" />
          <span>Dashboard</span>
        </button>
        <button className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-100">
          <Ruler className="h-3.5 w-3.5" />
          Rulers
        </button>
        <button className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-100">
          <Grid3X3 className="h-3.5 w-3.5" />
          Grid
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        <button className="rounded-md border border-slate-800 bg-slate-900/80 p-1 hover:bg-slate-800/80">
          <ZoomOut className="h-3.5 w-3.5" />
        </button>
        <button className="rounded-md border border-slate-800 bg-slate-900/80 px-2 py-1 hover:bg-slate-800/80">
          80%
        </button>
        <button className="rounded-md border border-slate-800 bg-slate-900/80 p-1 hover:bg-slate-800/80">
          <ZoomIn className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-1 rounded-md border border-slate-800 bg-slate-900/80 px-2 py-1 hover:bg-slate-800/80">
          <MonitorSmartphone className="h-3.5 w-3.5" />
          Desktop • 1440
        </button>
        <button className="inline-flex items-center gap-1 rounded-md border border-violet-700 bg-violet-700/90 px-2 py-1 text-[11px] text-white shadow shadow-violet-700/40 hover:bg-violet-600/90">
          <Sparkles className="h-3.5 w-3.5" />
          Balance layout
        </button>
      </div>
    </footer>
  );
}
