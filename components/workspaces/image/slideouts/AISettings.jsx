"use client";

import { useWorkspaceUIStore } from "@/lib/state/ui/useWorkspaceUIStore";
import SlideoutCard from "./SlideoutCard";
import { useImageWorkspaceStore } from "@/lib/state/workspaces/image/useImageWorkspaceStore";

export default function AISettings() {
  const active = useWorkspaceUIStore((s) => s.activeRightSlideout);
  const closeRight = useWorkspaceUIStore((s) => s.closeRight);
  const applyAI = useImageWorkspaceStore((s) => s.applyAITransform);
  const aiBusy = useImageWorkspaceStore((s) => s.aiBusy);

  if (active !== "aiSettings") return null;

  return (
    <div className="pointer-events-auto flex flex-col gap-3">
      <SlideoutCard title="AI settings" onClose={closeRight} width="slideout-sm">
        <p className="nw-subtext">Dial in AI Enhance, Restore, or Cleanup without cluttering the inspector.</p>
        <label className="nw-field">
          <span className="nw-field__label">Model</span>
          <select className="nw-select">
            <option>Standard</option>
            <option>HD</option>
            <option>Face</option>
          </select>
        </label>
        <label className="nw-field">
          <span className="nw-field__label">Strength</span>
          <input type="range" min={0} max={100} defaultValue={65} className="nw-slider" />
        </label>
        <label className="nw-field">
          <span className="nw-field__label">Clean vs Detail</span>
          <input type="range" min={0} max={100} defaultValue={50} className="nw-slider" />
        </label>
        <label className="nw-field">
          <span className="nw-field__label">Edge smoothness</span>
          <input type="range" min={0} max={100} defaultValue={40} className="nw-slider" />
        </label>
        <div className="mt-3 space-y-2">
          {[
            { id: "bgremove", label: "Remove Background" },
            { id: "magic", label: "Magic Select" },
            { id: "smartfill", label: "Smart Fill" },
            { id: "enhance", label: "Enhance" },
          ].map((action) => (
            <button
              key={action.id}
              type="button"
              className="nw-btn ghost w-full justify-between"
              onClick={() => applyAI(action.id)}
              disabled={aiBusy}
            >
              <span>{action.label}</span>
              {aiBusy ? <span className="text-xs text-neutral-500">Running…</span> : null}
            </button>
          ))}
        </div>
      </SlideoutCard>
    </div>
  );
}
