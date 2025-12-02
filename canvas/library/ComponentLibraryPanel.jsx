"use client";

import { useComponentLibraryUI } from "./componentLibraryUI";
import { useComponentStore } from "@/canvas/components/componentStore";
import ComponentPreview from "./ComponentPreview";
import { useCanvasDropZone } from "./useCanvasDropZone";
import LibraryManager from "./LibraryManager";

export default function ComponentLibraryPanel() {
  const { isOpen, search, setSearch } = useComponentLibraryUI();
  const masters = useComponentStore((state) => state.masters);

  if (!isOpen) return null;

  const query = search.toLowerCase();
  const { startDragging } = useCanvasDropZone();

  const items = Object.values(masters).filter((master) =>
    master.name?.toLowerCase().includes(query)
  );

  return (
    <div className="w-64 bg-[#0B0B12] text-white h-full border-r border-white/5 flex flex-col">
      <div className="p-3 border-b border-white/5">
        <input
          placeholder="Search components..."
          className="w-full p-2 rounded bg-neutral-900 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {items.length === 0 && (
          <div className="text-neutral-500 text-sm">No components found.</div>
        )}

        {items.map((master) => (
          <ComponentPreview
            key={master.id}
            master={master}
            onDragStart={startDragging}
          />
        ))}

        <LibraryManager />
      </div>
    </div>
  );
}
