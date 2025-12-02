import { useEffect } from "react";
import { useWorkspaceStore } from "@/lib/state/workspace/useWorkspaceStore";

export default function useTimelineEvents() {
  const mode = useWorkspaceStore((s) => s.mode);

  useEffect(() => {
    if (!["video", "audio"].includes(mode)) return;
    const handleWheel = (event) => {
      if (!event.detail?.e) return;
      console.debug("Timeline scroll", event.detail.e.deltaY);
    };
    window.addEventListener("canvas:pointerMove", handleWheel);
    return () => window.removeEventListener("canvas:pointerMove", handleWheel);
  }, [mode]);
}
