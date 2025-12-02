"use client";

import { useWorkspaceUIStore } from "@/lib/state/ui/useWorkspaceUIStore";
import SlideoutCard from "./SlideoutCard";

const SHAPES = [
  { id: "rect", name: "Rectangle", variant: "Round", tag: "Basic" },
  { id: "circle", name: "Circle", variant: "Perfect", tag: "Basic" },
  { id: "triangle", name: "Triangle", variant: "Equilateral", tag: "Basic" },
  { id: "star", name: "Star", variant: "5-point", tag: "Decorative" },
  { id: "blob", name: "Blob", variant: "Organic", tag: "Decorative" },
  { id: "badge", name: "Badge", variant: "Ribbon", tag: "UI" },
];

export default function ShapesBrowser() {
  const active = useWorkspaceUIStore((s) => s.activeLeftSlideout);
  const closeLeft = useWorkspaceUIStore((s) => s.closeLeft);

  if (active !== "shapes") return null;

  return (
    <div className="flex flex-col gap-3">
      <SlideoutCard title="Shapes" onClose={closeLeft}>
        <p className="text-xs text-neutral-500">Pick a shape to drop onto the canvas.</p>
        <div className="grid grid-cols-2 gap-2">
          {SHAPES.map((shape) => (
            <button
              key={shape.id}
              type="button"
              className="rounded-lg border border-neutral-200 bg-white px-3 py-3 text-left shadow-sm transition hover:-translate-y-[1px] hover:border-violet-400 hover:shadow-md"
            >
              <div className="text-sm font-semibold text-neutral-900">{shape.name}</div>
              <div className="text-[11px] text-neutral-500">{shape.variant}</div>
              <span className="mt-2 inline-flex items-center rounded-full bg-neutral-100 px-2 py-1 text-[10px] font-semibold text-neutral-600">
                {shape.tag}
              </span>
            </button>
          ))}
        </div>
      </SlideoutCard>
    </div>
  );
}
