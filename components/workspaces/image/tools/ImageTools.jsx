"use client";

import {
  MousePointer2,
  Crop,
  Move,
  Paintbrush,
  Eraser,
  Wand2,
  Scissors,
  Sparkles,
  SlidersHorizontal,
  Settings,
  Lasso,
  Image as ImageIcon,
  Palette,
} from "lucide-react";
import { useImageWorkspaceStore } from "@/lib/state/workspaces/image/useImageWorkspaceStore";
import { useWorkspaceUIStore } from "@/lib/state/ui/useWorkspaceUIStore";

const TOOL_GROUPS = [
  {
    title: "Selection Tools",
    tools: [
      { id: "select", label: "Select", icon: MousePointer2 },
      { id: "move", label: "Move", icon: Move },
      { id: "crop", label: "Crop", icon: Crop },
    ],
  },
  {
    title: "Brush & Erase",
    tools: [
      { id: "brush", label: "Brush", icon: Paintbrush },
      { id: "erase", label: "Erase", icon: Eraser },
      { id: "mask", label: "Mask Brush", icon: Scissors },
      { id: "lasso", label: "Lasso", icon: Lasso },
    ],
  },
  {
    title: "AI Tools",
    tools: [
      { id: "bgremove", label: "BG Remove", icon: Sparkles, popup: "bgremove" },
      { id: "magic", label: "Magic Select", icon: Wand2 },
      { id: "smartfill", label: "Smart Fill (Inpaint)", icon: Sparkles },
      { id: "enhance", label: "Enhance", icon: Sparkles },
    ],
  },
  {
    title: "Image Tools",
    tools: [
      { id: "filters", label: "Filters", icon: SlidersHorizontal, slideout: "filters" },
      { id: "adjust", label: "Adjust", icon: SlidersHorizontal },
      { id: "effects", label: "Effects", icon: SlidersHorizontal },
    ],
  },
];

export default function ImageTools() {
  const activeTool = useImageWorkspaceStore((s) => s.activeTool);
  const setActiveTool = useImageWorkspaceStore((s) => s.setActiveTool);
  const setBgRemoveConfirm = useImageWorkspaceStore((s) => s.setBgRemoveConfirm);

  const openLeft = useWorkspaceUIStore((s) => s.openLeft);
  const closeLeft = useWorkspaceUIStore((s) => s.closeLeft);
  const openRight = useWorkspaceUIStore((s) => s.openRight);
  const closeRight = useWorkspaceUIStore((s) => s.closeRight);
  const openModal = useWorkspaceUIStore((s) => s.openModal);

  return (
    <div className="space-y-4">
      {TOOL_GROUPS.map((group) => (
        <div key={group.title} className="space-y-2">
          <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">{group.title}</div>
          <div className="flex flex-col gap-2">
            {group.tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.id;
              const hasSettings = tool.id === "crop" || tool.id === "brush" || tool.slideout === "filters";

              const handleClick = () => {
                setActiveTool(tool.id);

                const maskTools = ["mask", "lasso", "bgremove", "smartfill", "magic", "brush", "erase"];
                const aiTools = ["enhance", "magic", "smartfill", "bgremove"];

                // Mask slideout
                if (maskTools.includes(tool.id)) {
                  openRight("mask");
                } else if (aiTools.includes(tool.id)) {
                  openRight("aiSettings");
                } else if (tool.id === "filters" || tool.id === "effects") {
                  openRight("filterSettings");
                } else {
                  closeRight();
                }

                // Left slideouts for browsing
                if (tool.id === "filters") {
                  openLeft("filters");
                } else if (tool.id === "effects") {
                  openLeft("effects");
                } else {
                  closeLeft();
                }

                // AI settings slideout
                if (aiTools.includes(tool.id)) {
                  openRight("aiSettings");
                }

                // BG remove confirmation popout
                if (tool.id === "bgremove") {
                  setBgRemoveConfirm(true);
                  openModal("bgremove");
                }
              };

              const handleSettings = (e) => {
                e.stopPropagation();
                if (tool.slideout === "filters") openLeft("filters");
                if (tool.id === "brush" || tool.id === "crop") openRight("mask");
              };

              return (
                <div key={tool.id} className="relative flex items-center gap-2">
                  <button
                    onClick={handleClick}
                    title={tool.label}
                    className={`flex flex-1 items-center gap-2 rounded-md px-2 py-2 text-sm transition ${
                      isActive
                        ? "bg-violet-600 text-white shadow"
                        : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                    }`}
                    type="button"
                  >
                    <Icon size={16} />
                    <span>{tool.label}</span>
                  </button>
                  {hasSettings && (
                    <button
                      type="button"
                      onClick={handleSettings}
                      className={`rounded-md p-2 transition ${
                        isActive
                          ? "bg-violet-700/70 text-white hover:bg-violet-700"
                          : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                      }`}
                      title={`${tool.label} settings`}
                    >
                      <Settings size={14} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Libraries moved to top library panel; removed duplicate block */}
    </div>
  );
}
