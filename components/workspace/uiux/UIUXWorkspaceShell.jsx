"use client";

import TopBar from "./TopBar";
import LeftToolbar from "./LeftToolbar";
import LeftPanelRail from "./LeftPanelRail";
import CanvasViewport from "./CanvasViewport";
import RightInspector from "./RightInspector";
import BottomToolbar from "./BottomToolbar";
import TemplateBrowserSlideout from "./TemplateBrowserSlideout";
import { usePanelsStore } from "@/stores/panelsStore";

export default function UIUXWorkspaceShell() {
  const isLeftPanelCollapsed = usePanelsStore((s) => s.isLeftPanelCollapsed);

  return (
    <div className="flex h-full w-full flex-col">
      <TopBar />

      <div className="relative flex min-h-0 flex-1">
        <div className="flex-shrink-0 border-r border-slate-800 bg-slate-950/80 backdrop-blur-lg">
          <LeftToolbar />
        </div>

        {!isLeftPanelCollapsed && (
          <div className="w-72 flex-shrink-0 border-r border-slate-900 bg-slate-950/60 backdrop-blur-xl">
            <LeftPanelRail />
          </div>
        )}

        <div className="relative min-w-0 flex-1 bg-slate-950">
          <CanvasViewport />
          <TemplateBrowserSlideout />
        </div>

        <div className="w-80 flex-shrink-0 border-l border-slate-900 bg-slate-950/80 backdrop-blur-xl">
          <RightInspector />
        </div>
      </div>

      <BottomToolbar />
    </div>
  );
}
