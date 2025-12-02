"use client";

import { useWorkspaceUIStore } from "@/lib/state/ui/useWorkspaceUIStore";
import SlideoutCard from "./SlideoutCard";

const TEMPLATE_CARDS = [
  { id: "photo-grid", title: "Photo grid", tags: ["Collage", "Clean"] },
  { id: "portrait-duo", title: "Portrait duo", tags: ["Portrait", "Soft"] },
  { id: "product-hero", title: "Product hero", tags: ["Ecomm", "Bold"] },
  { id: "story", title: "Story format", tags: ["Story", "Vertical"] },
];

export default function TemplatesBrowser() {
  const active = useWorkspaceUIStore((s) => s.activeLeftSlideout);
  const closeLeft = useWorkspaceUIStore((s) => s.closeLeft);

  if (active !== "templates") return null;

  return (
    <div className="flex flex-col gap-3">
      <SlideoutCard title="Templates" onClose={closeLeft} width="w-72">
        <p className="text-xs text-neutral-500">Bring in ready-to-edit photo templates.</p>
        <div className="grid grid-cols-2 gap-2">
          {TEMPLATE_CARDS.map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              className="overflow-hidden rounded-md border border-neutral-200 bg-neutral-50 px-2 py-2 text-left transition hover:-translate-y-[1px] hover:border-violet-400 hover:bg-white"
            >
              <div className="mb-2 aspect-video rounded bg-neutral-200" />
              <div className="text-sm font-semibold text-neutral-800">{tpl.title}</div>
              <div className="text-[11px] text-neutral-500">{tpl.tags.join(" · ")}</div>
            </button>
          ))}
        </div>
      </SlideoutCard>
    </div>
  );
}
