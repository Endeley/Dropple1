"use client";

import { useWorkspaceUIStore } from "@/lib/state/ui/useWorkspaceUIStore";
import SlideoutCard from "./SlideoutCard";

const PROJECTS = [
  { id: "proj-brand", title: "Branding Kit", meta: "Updated 2h ago", size: "1080x1080" },
  { id: "proj-summer", title: "Summer Campaign", meta: "Updated yesterday", size: "1920x1080" },
  { id: "proj-portrait", title: "Portrait Retouch", meta: "Updated 3d ago", size: "2160x2160" },
  { id: "proj-lookbook", title: "Lookbook", meta: "Updated 1w ago", size: "1240x1750" },
];

export default function ProjectsBrowser() {
  const active = useWorkspaceUIStore((s) => s.activeLeftSlideout);
  const closeLeft = useWorkspaceUIStore((s) => s.closeLeft);

  if (active !== "projects") return null;

  return (
    <div className="flex flex-col gap-3">
      <SlideoutCard title="My Projects" onClose={closeLeft}>
        <p className="text-xs text-neutral-500">Open, duplicate, or clean up existing projects.</p>
        <div className="grid grid-cols-1 gap-3">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="group overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-[2px] hover:border-violet-400/80 hover:shadow-lg"
            >
              <div className="relative aspect-video bg-gradient-to-br from-neutral-100 via-neutral-50 to-white">
                <div className="absolute inset-3 rounded-lg border border-dashed border-neutral-300/80 bg-white/60 group-hover:border-violet-300/70" />
                <div className="absolute top-2 right-2 rounded-full bg-black/70 px-2 py-1 text-[11px] font-semibold text-white">
                  {proj.size}
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <div>
                  <div className="text-sm font-semibold text-neutral-900">{proj.title}</div>
                  <div className="text-[11px] text-neutral-500">{proj.meta}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-md border border-neutral-200 bg-white px-2 py-1 text-[11px] font-semibold text-neutral-700 transition hover:border-violet-300 hover:text-violet-600"
                  >
                    Open
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-neutral-200 bg-white px-2 py-1 text-[11px] font-semibold text-neutral-700 transition hover:border-violet-300 hover:text-violet-600"
                  >
                    Duplicate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SlideoutCard>
    </div>
  );
}
