"use client";

import { useWorkspaceStore } from "@/lib/state/workspace/useWorkspaceStore";
import { getMode } from "@/modules";
import CanvasOrchestrator from "./canvas/CanvasOrchestrator";

export default function WorkspaceCanvasArea() {
  const mode = useWorkspaceStore((s) => s.mode);
  const config = getMode(mode);
  const Overlay = config?.canvas;

  return (
    <div className="w-full h-full border-x border-white/5">
      <CanvasOrchestrator Overlay={Overlay} />
    </div>
  );
}
