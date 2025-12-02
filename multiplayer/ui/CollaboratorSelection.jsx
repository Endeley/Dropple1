"use client";

import { useCollaboratorsStore } from "@/stores/useCollaboratorsStore";

export default function CollaboratorSelection({ canvas }) {
  const collabs = useCollaboratorsStore((s) => s.collaborators);

  return (
    <>
      {Object.entries(collabs).map(([id, c]) => {
        if (!c.selection?.length) return null;

        const objects = canvas.getObjects();

        const selected = objects.filter((o) =>
          c.selection.includes(o.__objectId)
        );

        return selected.map((obj) => {
          const bound = obj.getBoundingRect();

          return (
            <div
              key={`${id}-${obj.__objectId}`}
              className="absolute pointer-events-none border-2 rounded-sm"
              style={{
                borderColor: c.color,
                left: bound.left,
                top: bound.top,
                width: bound.width,
                height: bound.height,
              }}
            ></div>
          );
        });
      })}
    </>
  );
}
