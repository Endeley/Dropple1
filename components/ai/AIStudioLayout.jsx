"use client";

import AILeftSidebar from "./AILeftSidebar";
import AIPreviewCanvas from "./AIPreviewCanvas";
import AISettingsPanel from "./AISettingsPanel";
import AITopBar from "./AITopBar";
import DevToolsPanel from "../dev/DevToolsPanel";
import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

export default function AIStudioLayout() {
  const mode = useAIStudioStore((s) => s.mode);

  return (
    <div className="h-screen w-screen flex bg-black text-white overflow-hidden">
      <AILeftSidebar />

      <div className="flex-1 flex flex-col">
        <AITopBar />

        <div className="flex flex-1">
          <div className="flex-1 p-4">
            <AIPreviewCanvas />
          </div>

          {mode === "dev" ? <DevToolsPanel /> : <AISettingsPanel />}
        </div>
      </div>
    </div>
  );
}
