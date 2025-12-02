"use client";

import { useCollaboratorsStore } from "@/stores/useCollaboratorsStore";

export default function CollaboratorCursor() {
  const collabs = useCollaboratorsStore((s) => s.collaborators);

  return (
    <>
      {Object.entries(collabs).map(([id, c]) => {
        if (!c.cursor) return null;

        return (
          <div
            key={id}
            className="pointer-events-none absolute z-50"
            style={{
              left: c.cursor.x,
              top: c.cursor.y,
              color: c.color,
            }}
          >
            <div className="text-xs">{c.name}</div>
            <div className="w-3 h-3 bg-current rounded-full"></div>
          </div>
        );
      })}
    </>
  );
}
