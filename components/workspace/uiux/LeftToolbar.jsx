"use client";

import { useToolsStore } from "@/stores/toolsStore";
import {
  Circle,
  Frame,
  Hand,
  MessageCircleMore,
  Pen,
  Pointer,
  Slice,
  Square,
  Type,
  Wand2,
} from "lucide-react";

const tools = [
  { id: "select", icon: Pointer, label: "Move / Select", active: true },
  { id: "frame", icon: Frame, label: "Frame" },
  { id: "rect", icon: Square, label: "Rectangle" },
  { id: "ellipse", icon: Circle, label: "Ellipse" },
  { id: "pen", icon: Pen, label: "Pen" },
  { id: "text", icon: Type, label: "Text" },
  { id: "hand", icon: Hand, label: "Hand" },
  { id: "slice", icon: Slice, label: "Slice" },
];

export default function LeftToolbar() {
  const activeTool = useToolsStore((s) => s.activeTool);
  const setActiveTool = useToolsStore((s) => s.setActiveTool);

  return (
    <div className="flex h-full w-12 flex-col items-center gap-3 py-3">
      <div className="flex flex-col items-center gap-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`group relative flex h-8 w-8 items-center justify-center rounded-md border text-slate-200 transition
            ${
              activeTool === tool.id
                ? "border-violet-500 bg-violet-600/80 shadow-[0_0_12px_rgba(129,140,248,0.6)]"
                : "border-slate-800 bg-slate-900/80 hover:bg-slate-800/90"
            }`}
          >
            <tool.icon className="h-4 w-4" />
            <span className="pointer-events-none absolute left-11 z-20 hidden rounded-md bg-slate-900/95 px-2 py-1 text-xs text-slate-100 shadow-lg group-hover:block">
              {tool.label}
            </span>
          </button>
        ))}
      </div>

      <div className="flex-1" />

      <div className="flex flex-col items-center gap-2 pb-2">
        <button className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-slate-900/80 text-slate-200 hover:bg-slate-800/90">
          <MessageCircleMore className="h-4 w-4" />
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-md border border-violet-600 bg-violet-700/80 text-violet-50 shadow shadow-violet-600/40 hover:bg-violet-600/90">
          <Wand2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
