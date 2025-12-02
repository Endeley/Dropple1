"use client";

import { createComponentInstance } from "@/canvas/components/createComponentInstance";
import { useThumbnailGenerator } from "./useThumbnailGenerator";
import { useComponentStore } from "@/canvas/components/componentStore";

export default function ComponentPreview({ master, onDragStart }) {
  useThumbnailGenerator(master.id);
  const thumbnail = useComponentStore((state) => state.thumbnails[master.id]);

  return (
    <div
      className="bg-neutral-900/80 border border-white/5 rounded-lg p-3 cursor-pointer hover:bg-neutral-800 transition space-y-2"
      draggable
      onDragStart={(e) => onDragStart(e, master.id)}
      onClick={() => createComponentInstance(master.id)}
    >
      <div className="w-full h-28 bg-neutral-800 rounded flex items-center justify-center overflow-hidden">
        {thumbnail ? (
          <img src={thumbnail} alt={master.name} className="w-full h-full object-contain" />
        ) : (
          <div className="text-neutral-500 text-xs">Rendering…</div>
        )}
      </div>
      <div>
        <div className="font-semibold text-sm truncate">{master.name}</div>
        <div className="text-xs text-neutral-500">
          {master.rootLayerIds?.length || 0} layers
        </div>
      </div>
    </div>
  );
}
