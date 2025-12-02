"use client";

import { useWorkspaceStore } from "@/lib/state/workspace/useWorkspaceStore";
import { getMode } from "@/modules";
import TimelineBar from "./ui/TimelineBar";

export default function WorkspaceBottomBar({ config: injected }) {
  const mode = useWorkspaceStore((s) => s.mode);
  const config = injected || getMode(mode);

  if (config?.timeline) {
    const Timeline = config.timeline === true ? TimelineBar : config.timeline;
    return <Timeline />;
  }

  return (
    <div className="h-full bg-black/40 backdrop-blur-2xl border-t border-white/10 flex items-center justify-between px-6 text-sm text-white/70">
      <div>Zoom • Fit • Snapping</div>
      <div>AI Assist • History</div>
    </div>
  );
}
