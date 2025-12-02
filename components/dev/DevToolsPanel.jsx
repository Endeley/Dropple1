"use client";

import DevLayerTree from "./DevLayerTree";
import DevInspector from "./DevInspector";
import DevCodeBlock from "./DevCodeBlock";
import DevExportBar from "./DevExportBar";

export default function DevToolsPanel() {
  return (
    <div className="w-96 h-full border-l border-white/10 bg-white/[0.03] backdrop-blur-xl flex flex-col overflow-hidden">
      <DevExportBar />
      <DevLayerTree />
      <DevInspector />
      <DevCodeBlock />
    </div>
  );
}
